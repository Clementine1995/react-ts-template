/** @format */

import React, { useCallback, useEffect, useRef } from 'react'

import { useRefState, useInstance, useForceUpdate, useActive } from '../../libs/hooks'
import { Button } from 'antd'

function Demo1() {
  const [count, setCount, countRef] = useRefState(0)

  const elRef = useRef(null)
  const active = useActive(elRef)

  const handleIncr = useCallback(() => {
    setCount(countRef.current + 1)
  }, [countRef, setCount])

  return (
    <div>
      {count}: <Counter onClick={handleIncr}>increment</Counter>
      <div>{/* <Demo></Demo> */}</div>
      <div ref={elRef}>{active ? 'Active' : 'Nop'}</div>
      <Demo />
    </div>
  )
}

function Counter({ onClick, children }) {
  return <Button onClick={onClick}>{children}</Button>
}

function Demo() {
  const inst = useInstance({ count: 1 })
  console.log(inst)
  const update = useForceUpdate()
  useEffect(() => {
    const timer = setInterval(() => {
      // 像类组件一样，进行‘实例变量’存储
      // 在函数组件的任意地方引用
      // 只不过更新这些数据不会触发组件的重新渲染
      inst.count++
    }, 1000)

    return () => clearInterval(timer)
  }, [inst.count])

  return (
    <div>
      count: {inst.count}
      <button onClick={update}>刷新</button>
    </div>
  )
}
export default Demo1
