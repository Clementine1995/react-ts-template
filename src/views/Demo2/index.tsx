/** @format */

import React, { useState, useLayoutEffect, useEffect } from 'react'
import ModalRenderer from './ModalRender'

import WithModal from './WithModal'

function Demo2() {
  const [color, setColor] = useState('red')
  useLayoutEffect(() => {
    alert(color)
  })
  useEffect(() => {
    console.log('color', color)
  })

  return (
    <ModalRenderer>
      <WithModal />
      <div id="myDiv" style={{ background: color }}>
        颜色
      </div>
      <button onClick={() => setColor('red')}>红</button>
      <button onClick={() => setColor('yellow')}>黄</button>
      <button onClick={() => setColor('blue')}>蓝</button>
    </ModalRenderer>
  )
}

export default Demo2
