/** @format */

// https://juejin.im/post/5d565015f265da03eb13c575

import React, { useState } from 'react'
import { translateY, getRandomColor } from '../../libs/utils'

const EzChart = props => {
  const [dataQueue, setDataQueue] = useState([])
  const [activeItemIdx, setActiveItemIdx] = useState(0)
  const [highestValue, setHighestValue] = useState(0)
  const [currentValues, setCurrentValues] = useState({})
  const [firstRun, setFirstRun] = useState(false)
  return <div></div>
}

export default EzChart
