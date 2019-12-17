/** @format */

import React, { Component } from 'react'

import { DynamicBarChart } from './DynamicChart.jsx'

import helpers from './helpers'
import mocks from './mock'

// import 'react-dynamic-charts/dist/index.css'

// 一次生成101条用于后面渲染的数据
// helpers.generateData(100, mocks.defaultChart, {
//   prefix: 'Iteration'
// })

export default class App extends Component {
  render() {
    return (
      <DynamicBarChart
        barGapSize={10}
        data={helpers.generateData(1, mocks.defaultChart, {
          prefix: 'Iteration'
        })}
        iterationTimeout={100}
        showTitle={true}
        startRunningTimeout={2500}
      />
    )
  }
}
