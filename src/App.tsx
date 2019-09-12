/** @format */

import * as React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

import HomeComponent from './views/Home'
const AboutComponent = loadable(() => import(/* webpackChunkName: "about" */ './views/About'))
const OtherComponent = loadable(() => import(/* webpackChunkName: "other" */ './views/Other'))
const ChartComponent = loadable(() => import(/* webpackChunkName: "chart" */ './views/Chart'))

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Router>
          <ul className="app-nav">
            <li className="app-nav__item">
              <Link to="/">To Home</Link>
            </li>
            <li className="app-nav__item">
              <Link to="/about">To About</Link>
            </li>
            <li className="app-nav__item">
              <Link to="/other">To Other</Link>
            </li>
            <li className="app-nav__item">
              <Link to="/chart">To Chart</Link>
            </li>
          </ul>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/other" component={OtherComponent}></Route>
          <Route path="/about" component={AboutComponent}></Route>
          <Route path="/chart" component={ChartComponent}></Route>
        </Router>
      </div>
    )
  }
}

export default App
