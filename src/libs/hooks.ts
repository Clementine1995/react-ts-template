/** @format */

// https://juejin.im/post/5d594ea5518825041301bbcb 下面大部分hook来源
// https://github.com/streamich/react-use 更多自定义hook

import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  MutableRefObject,
  useMemo
} from 'react'
import { EventEmitter } from 'events'

// 模拟传统的setState
export function useSetState<S extends Record<string, any>>(
  initalState: S | (() => S)
): [S, (state: Partial<S> | ((state: S) => Partial<S>)) => void] {
  const [_state, _setState] = useState<S>(initalState)
  // setState也可以接受一个函数，这个函数用上一个 state 作为第一个参数，而prev就是useState更新方法中传入函数时的上一个状态
  const setState = useCallback((state: Partial<S> | ((state: S) => Partial<S>)) => {
    _setState((prev: S) => {
      let nextState = state
      if (typeof state === 'function') {
        nextState = state(prev)
      }

      return { ...prev, ...nextState }
    })
  }, [])

  return [_state, setState]
}

// 强制重新渲染
export function useForceUpdate() {
  const [, setValue] = useState(0)
  return useCallback(() => {
    // 递增state值，强制React进行重新渲染
    setValue(val => (val + 1) % (Number.MAX_SAFE_INTEGER - 1))
  }, [])
}

//  简化localStorage存取
export function useStorage<T>(
  key: string,
  // 默认值
  defaultValue?: T | (() => T),
  // 是否在窗口关闭后保持数据
  keepOnWindowClosed = true
): [T | undefined, Dispatch<SetStateAction<T>>, () => void] {
  const storage = keepOnWindowClosed ? localStorage : sessionStorage

  // 尝试从Storage恢复值
  const getStorageValue = () => {
    try {
      const storageValue = storage.getItem(key)
      if (storageValue != null) {
        return JSON.parse(storageValue)
      } else if (defaultValue) {
        // 设置默认值
        const value = typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue
        storage.setItem(key, JSON.stringify(value))
        return value
      }
    } catch (err) {
      console.warn(`useStorage 无法获取${key}: `, err)
    }

    return undefined
  }
  // 以一个函数来初始化useState
  const [value, setValue] = useState<T | undefined>(getStorageValue)

  // 更新组件状态并保存到Storage
  // type Dispatch<A> = (value: A) => void;
  // type SetStateAction<S> = S | ((prevState: S) => S);
  // function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;

  const save = useCallback<Dispatch<SetStateAction<T>>>(
    value => {
      setValue(prev => {
        const finalValue = typeof value === 'function' ? (value as (prev: T | undefined) => T)(prev) : value
        storage.setItem(key, JSON.stringify(finalValue))
        return finalValue
      })
    },
    [key, storage]
  )

  // 移除状态
  const clear = useCallback(() => {
    storage.removeItem(key)
    setValue(undefined)
  }, [key, storage])

  return [value, save, clear]
}

// 引用state的最新值

export function useRefState<S>(
  initialState: S | (() => S)
): [S, (state: S | ((state: S) => S)) => void, MutableRefObject<S>] {
  // interface MutableRefObject<T> {
  //   current: T
  // }
  const ins = useRef<S>()
  // function useRef<T = undefined>(): MutableRefObject<T | undefined>;

  const [state, setState] = useState(() => {
    // 初始化
    const value = initialState instanceof Function ? initialState() : initialState
    ins.current = value
    return value
  })

  const setValue = useCallback<Dispatch<SetStateAction<S>>>(value => {
    if (value instanceof Function) {
      setState((prevState: S) => {
        const finalValue = value(prevState)
        ins.current = finalValue
        return finalValue
      })
    } else {
      ins.current = value
      setState(value)
    }
  }, [])

  return [state, setValue, ins as MutableRefObject<S>]
}

// 引用最新的Props

export default function useRefProps<T>(props: T) {
  const ref = useRef<T>(props)
  // 每次重新渲染设置值
  ref.current = props

  return ref
}

// useInstance
function isFunction<T>(initial?: T | (() => T)): initial is () => T {
  return typeof initial === 'function'
}

export function useInstance<T extends {}>(initial?: T | (() => T)) {
  const instance = useRef<T>()
  // 初始化
  console.log(instance)
  if (!instance.current) {
    if (initial) {
      instance.current = isFunction(initial) ? initial() : initial
    } else {
      instance.current = {} as T
    }
  }
  return instance.current
}

// 获取上一次渲染的值

export function usePrevious<T>(value: T) {
  const ref = useRef<T>()
  // useEffect会在完成这次'渲染'之后执行
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// export function useImmer(initialValue) {
//   const [val, updateValue] = useState(initialValue)
//   return [
//     val,
//     useCallback(updater => {
//       updateValue(produce(updater))
//     }, [])
//   ]
// }

// useToggle 开关实现布尔值切换

export function useToggle(initialValue?: boolean) {
  const [value, setValue] = useState(!!initialValue)
  const toggler = useCallback(() => setValue(value => !value), [])

  return [value, toggler]
}

// useArray 简化数组状态操作
export function useArray<T>(initial?: T[] | (() => T[]), idKey = 'id') {
  const [value, setValue] = useState(initial || [])
  return {
    value,
    setValue,
    push: useCallback(a => setValue(v => [...v, a]), []),
    clear: useCallback(() => setValue(() => []), []),
    // removeById: useCallback(id => setValue(arr => arr.filter(v => v && v[idKey] !== id)), [idKey]),
    removeIndex: useCallback(
      index =>
        setValue(v => {
          v.splice(index, 1)
          return v
        }),
      []
    )
  }
}

// 模拟componentDidMount
// 如果需要在挂载/状态更新时请求一些资源、并且需要在卸载时释放这些资源，还是推荐使用useEffect
export function useOnMount(fn: Function) {
  useEffect(() => {
    fn()
  /* eslint-disable */
  }, []) // 第二个参数设置为[], 表示不必对任何数据， 所以只在首次渲染时调用
}

// 模拟componentWillUnmount

export function useOnUnmount(fn: Function) {
  useEffect(() => {
    return () => {
        fn()
    }
  }, [])
}

// 模拟componentDidUpdate

export function useOnUpdate(fn: () => void, dep?: any[]) {
  const ref = useRef({ fn, mounted: false })
  ref.current.fn = fn

  useEffect(() => {
    // 首次渲染不执行
    if (!ref.current.mounted) {
      ref.current.mounted = true
    } else {
      ref.current.fn()
    }
  }, dep)
}

// 简化onChange表单双向绑定

export function useChange<S>(initial?: S | (() => S)) {
  const [value, setValue] = useState<S | undefined>(initial)
  const onChange = useCallback(e => setValue(e.target.value), [])

  return {
    value,
    setValue,
    onChange,
    // 绑定到原生事件
    bindEvent: {
      onChange,
      value,
    },
    // 绑定到自定义组件
    bind: {
      onChange: setValue,
      value,
    },
  }
}

// useBind 绑定回调参数

export function useBind(fn: (...args: any[]) => any, ...args: any[]): (...args: any[]) => any {
  return useMemo(() => fn.bind(null, ...args), args)
}

// useActive, 在鼠标按下时设置状态为true，鼠标释放时恢复为false

export function useActive(refEl: React.RefObject<HTMLElement>) {
  const [value, setValue] = useState(false)
  useEffect(() => {
    const handleMouseDown = () => {
      setValue(true)
    }
    const handleMouseUp = () => {
      setValue(false)
    }

    // DOM 事件监听
    if (refEl && refEl.current) {
      refEl.current.addEventListener('mousedown', handleMouseDown)
      refEl.current.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      if (refEl && refEl.current) {
        refEl.current.removeEventListener('mousedown', handleMouseDown)
        refEl.current.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [])

  return value
}


// useTouch 手势事件封装，useTouch的实现可以参考[useTouch.ts](https://github.com/GDJiaMi/hooks/blob/master/src/useTouch.ts)

// useDraggable 拖拽事件封装
export function useDraggable(ref: React.RefObject<HTMLElement>) {
  const [{ dx, dy }, setOffset] = useState({ dx: 0, dy: 0 })

  useEffect(() => {
    if (ref.current == null) {
      throw new Error(`[useDraggable] ref未注册到组件中`)
    }
    const el = ref.current

    const handleMouseDown = (event: MouseEvent) => {
      const startX = event.pageX - dx
      const startY = event.pageY - dy

      const handleMouseMove = (event: MouseEvent) => {
        const newDx = event.pageX - startX
        const newDy = event.pageY - startY
        setOffset({ dx: newDx, dy: newDy })
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener(
        'mouseup',
        () => {
          document.removeEventListener('mousemove', handleMouseMove)
        },
        { once: true },
      )
    }

    el.addEventListener('mousedown', handleMouseDown)

    return () => {
      el.removeEventListener('mousedown', handleMouseDown)
    }
  }, [dx, dy])

  useEffect(() => {
    if (ref.current) {
      ref.current.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }
  }, [dx, dy])
}

// react-events 面向未来的高级事件封装

// useSubscription 通用事件源订阅

// useEventEmitter 对接eventEmitter

const functionReturnObject = () => ({})
const functionReturnArray = () => []

export function useEventEmitter(emmiter: EventEmitter) {
  const disposers = useRef<Function[]>([])
  const listeners = useRef<{ [name: string]: Function }>({})

  const on = useCallback(<P>(name: string, cb: (data: P) => void) => {
    if (!(name in listeners.current)) {
      const call = (...args: any[]) => {
        const fn = listeners.current[name]
        if (fn) {
          fn(...args)
        }
      }
      // 监听eventEmitter
      emmiter.on(name, call)
      disposers.current.push(() => {
        emmiter.off(name, call)
      })
    }

    listeners.current[name] = cb
  }, [])

  useEffect(() => {
    // 资源释放
    return () => {
      disposers.current.forEach(i => i())
    }
  }, [])

  return {
    on,
    emit: emmiter.emit,
  }
}


// 补充react中使用event
// eventBus.js
// import {EventEmitter} from 'events';
// export default new EventEmitter();

// 监听
// import Bus from './eventBus'
// Bus.addListener('changeSiblingsData', (msg) => {
//   this.setState({
//     bus: msg,
//   });
//   console.log(msg);
// });

// 触发
// import Bus from './eventBus'
// Bus.emit('changeSiblingsData', msg);

// Context的妙用，不过需要注意的是如果上级Context.Provider的value变化，使用useContext的组件就会被强制重新渲染。

// useTheme 主题配置

// const ThemeContext = React.createContext<object>({})
// export const ThemeProvider: FC<{ theme: object }> = props => {
//   return (<ThemeContext.Provider value={props.theme}>{props.children}</ThemeContext.Provider>)
// }
// export function useTheme<T extends object>(): T {
//   return useContext(ThemeContext)
// }

// useI18n 国际化,I18n是另一个Context的典型使用场景。使用时可以参考react-intl和react-i18next

// react-hook-form是Hooks+Form的典型案例

// useTimeout 超时修改状态

export function useTimeout(ms: number) {
  const [ready, setReady] = useState(false)
  const timerRef = useRef<number>()

  const start = useCallback(() => {
    clearTimeout(timerRef.current)
    setReady(true)
    timerRef.current = window.setTimeout(() => {
      setReady(false)
    }, ms)
  }, [ms])

  const stop = useCallback(() => {
    clearTimeout(timerRef.current)
  }, [])

  useOnUnmount(stop)

  return [ready, start, stop]
}


// useOnlineStatus 监听在线状态

function getOnlineStatus() {
  return typeof navigator.onLine === 'boolean' ? navigator.onLine : true
}

export function useOnlineStatus() {
  let [onlineStatus, setOnlineStatus] = useState(getOnlineStatus())

  useEffect(() => {
    const online = () => setOnlineStatus(true)
    const offline = () => setOnlineStatus(false)
    window.addEventListener('online', online)
    window.addEventListener('offline', offline)

    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
    }
  }, [])

  return onlineStatus
}

// useTitle 设置文档title，当给定的值变化时，更新document.title

export function useTitle(t: string) {
  useEffect(() => {
    document.title = t
  }, [t]) 
}

// function Demo(props) {
//   useTitle(props.isEdit ? '编辑' : '新增')
//   // ....
// }

// useDebounce

export function useDebounce(fn: () => void, args?: any[], ms: number = 100, skipMount?: boolean) {
  const mounted = useRef(false)
  useEffect(() => {
    // 跳过挂载执行
    if (skipMount && !mounted.current) {
      mounted.current = true
      return undefined
    }

    const timer = setTimeout(fn, ms)

    return () => {
      // 如果args变化，先清除计时器
      clearTimeout(timer)
    }
  }, args)
}

// const returnEmptyArray = () => []
// function Demo() {
//   const [query, setQuery] = useState('')
//   const [list, setList] = useState(returnEmptyArray)

//   // 搜索
//   const handleSearch = async () => {
//     setList(await fetchList(query))
//   }

//   // 当query变化时执行搜索
//   useDebounce(handleSearch, [query], 500)

//   return (<div>
//     <SearchBar value={query} onChange={setQuery} />
//     <Result list={list}></Result>
//   </div>)
// }

// useThrottle

export const useThrottleFn = <T>(fn: (...args: any[]) => T, ms: number = 200, args: any[]) => {
  const [state, setState] = useState<T>(null as any);
  const timeout = useRef<any>(null);
  const nextArgs = useRef(null) as any;
  const hasNextArgs = useRef(false) as any;

  useEffect(() => {
    if (!timeout.current) {
      setState(fn(...args));
      const timeoutCallback = () => {
        if (hasNextArgs.current) {
          hasNextArgs.current = false;
          setState(fn(...nextArgs.current));
          timeout.current = window.setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = null;
        }
      };
      timeout.current = window.setTimeout(timeoutCallback, ms);
    } else {
      nextArgs.current = args;
      hasNextArgs.current = true;
    }
  }, args);

  useOnUnmount(() => {
    clearTimeout(timeout.current);
  });

  return state;
};

// usePromise 封装异步请求

