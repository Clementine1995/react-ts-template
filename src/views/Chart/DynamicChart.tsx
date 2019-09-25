/** @format */

// https://juejin.im/post/5d565015f265da03eb13c575

import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './index.scss'

const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const translateY = value => {
  return `translateY(${value}px)`
}

const DynamicBarChart = props => {
  const [dataQueue, setDataQueue] = useState([])
  const [activeItemIdx, setActiveItemIdx] = useState(0)
  const [highestValue, setHighestValue] = useState(0)
  const [currentValues, setCurrentValues] = useState({})
  const [firstRun, setFirstRun] = useState(false)
  let iterationTimeoutHolder = null

  function start() {
    if (activeItemIdx > 1) {
      return
    }
    nextStep(true)
  }

  function setNextValues() {
    if (!dataQueue[activeItemIdx]) {
      iterationTimeoutHolder = null
      return
    }

    const roundData = dataQueue[activeItemIdx].values
    const nextValues = {}
    let highestValue = 0
    roundData.map(c => {
      nextValues[c.id] = {
        ...c,
        color: c.color || (currentValues[c.id] || {}).color || getRandomColor()
      }

      if (Math.abs(c.value) > highestValue) {
        highestValue = Math.abs(c.value)
      }

      return c
    })
    console.table(highestValue)

    setCurrentValues(nextValues)
    setHighestValue(highestValue)
    setActiveItemIdx(activeItemIdx + 1)
  }

  function nextStep(firstRun = false) {
    setFirstRun(firstRun)
    setNextValues()
  }

  useEffect(() => {
    setDataQueue(props.data)
  }, [props.data])

  useEffect(() => {
    start()
  }, [dataQueue, start])

  useEffect(() => {
    iterationTimeoutHolder = window.setTimeout(nextStep, 1000)
    return () => {
      if (iterationTimeoutHolder) {
        window.clearTimeout(iterationTimeoutHolder)
      }
    }
  }, [activeItemIdx])

  const keys = Object.keys(currentValues)
  const { barGapSize, barHeight, showTitle, data } = props
  console.table('data', data)
  const maxValue = highestValue / 0.85
  const sortedCurrentValues = keys.sort((a, b) => currentValues[b].value - currentValues[a].value)
  const currentItem = dataQueue[activeItemIdx - 1] || {}

  return (
    <div className="live-chart">
      {
        <React.Fragment>
          {showTitle && <h1>{currentItem.name}</h1>}
          <section className="chart">
            <div className="chart-bars" style={{ height: (barHeight + barGapSize) * keys.length }}>
              {sortedCurrentValues.map((key, idx) => {
                const currentValueData = currentValues[key]
                const value = currentValueData.value
                const width = Math.abs((value / maxValue) * 100)
                let widthStr
                if (isNaN(width) || !width) {
                  widthStr = '1px'
                } else {
                  widthStr = `${width}%`
                }

                return (
                  <div
                    className={`bar-wrapper`}
                    style={{ transform: translateY((barHeight + barGapSize) * idx), transitionDuration: 200 / 1000 }}
                    key={`bar_${key}`}>
                    <label>{!currentValueData.label ? key : currentValueData.label}</label>
                    <div
                      className="bar"
                      style={{
                        height: barHeight,
                        width: widthStr,
                        background:
                          typeof currentValueData.color === 'string'
                            ? currentValueData.color
                            : `linear-gradient(to right, ${currentValueData.color.join(',')})`
                      }}
                    />
                    <span
                      className="value"
                      style={{
                        color:
                          typeof currentValueData.color === 'string'
                            ? currentValueData.color
                            : currentValueData.color[0]
                      }}>
                      {currentValueData.value}
                    </span>
                  </div>
                )
              })}
            </div>
          </section>
        </React.Fragment>
      }
    </div>
  )
}

DynamicBarChart.propTypes = {
  showTitle: PropTypes.bool,
  iterationTimeout: PropTypes.number,
  data: PropTypes.array,
  startRunningTimeout: PropTypes.number,
  barHeight: PropTypes.number,
  barGapSize: PropTypes.number,
  baseline: PropTypes.number
}

DynamicBarChart.defaultProps = {
  showTitle: true,
  iterationTimeout: 200,
  data: [],
  startRunningTimeout: 0,
  barHeight: 50,
  barGapSize: 20,
  baseline: null
}

export { DynamicBarChart }
