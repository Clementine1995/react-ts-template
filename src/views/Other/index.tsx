/** @format */

import React, { useState, useMemo, useEffect, useCallback } from 'react'

function Other() {
  const [xiaohong, setXiaohong] = useState('小红的状态')
  const [zhiling, setZhiling] = useState('小刚的状态')

  const [height, setHeight] = useState(0)

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height)
    }
  }, [])

  return (
    <>
      <button
        onClick={() => {
          setXiaohong(new Date().getTime().toString())
        }}>
        小红
      </button>
      <button
        onClick={() => {
          setZhiling(new Date().getTime() + ',小刚向我们走来了')
        }}>
        小刚
      </button>
      <ChildComponent name={xiaohong}>{zhiling}</ChildComponent>

      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  )
}

function ChildComponent({ name, children }: any) {
  function changeXiaohong(name: any) {
    return name + ',小红向我们走来了'
  }

  const actionXiaohong = useMemo(() => changeXiaohong(name), [name])
  return (
    <>
      <div>{actionXiaohong}</div>
      <div>{children}</div>
    </>
  )
}

export default Other
