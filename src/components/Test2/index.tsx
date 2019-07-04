/** @format */

import React, { useState, useEffect, useRef } from 'react'

function usePrevious(value: any) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

function Test2() {
  const [count, setCount] = useState(0)
  // 相当于 componentDidMount 和 componentDidUpdate:
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    document.title = `You clicked ${count} times`
  })
  const prevCount = usePrevious(count)

  function handleAlertClick() {
    setTimeout(() => {
      alert('You clicked on: ' + count)
    }, 3000)
  }
  return (
    <div>
      <p>
        You clicked {count} times , before: {prevCount}
      </p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
      <br />
      <img src={require('_img/test.svg')} alt="" />
      <Counter />
    </div>
  )
}

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setCount(c => c + 1) // 这个 effect 依赖于 `count` state
    }, 1000)
    return () => clearInterval(id)
  }, []) // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>
}

export default Test2
