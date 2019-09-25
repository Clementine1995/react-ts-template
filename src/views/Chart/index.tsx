/** @format */

import React, { Component } from 'react'

import { DynamicBarChart } from './DynamicChart'

import helpers from './helpers'
import mocks from './mock'

// import 'react-dynamic-charts/dist/index.css'

export default class App extends Component {
  render() {
    return (
      <DynamicBarChart
        barGapSize={10}
        data={helpers.generateData(100, mocks.defaultChart, {
          prefix: 'Iteration'
        })}
        iterationTimeout={100}
        showTitle={true}
        startRunningTimeout={2500}
      />
    )
  }
}
