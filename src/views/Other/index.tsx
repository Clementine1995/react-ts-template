/** @format */

import React, { useState, useMemo } from 'react'

console.log(23424)

function Other() {
  const [xiaohong, setXiaohong] = useState('小红的状态')
  const [zhiling, setZhiling] = useState('小刚的状态')
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
    </>
  )
}

function ChildComponent({ name, children }: any) {
  function changeXiaohong(name) {
    console.log('她来了，她来了。小红向我们走来了')
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
