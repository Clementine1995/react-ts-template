/** @format */

import * as React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

import HomeComponent from './views/Home'
// const HomeComponent = loadable(() => import(/* webpackChunkName: "home" */ /* webpackPreload: true */ './views/Home'))
const AboutComponent = loadable(() =>
  import(/* webpackChunkName: "about" */ /* webpackPrefetch: true */ './views/About')
)
const OtherComponent = loadable(() =>
  import(/* webpackChunkName: "other" */ /* webpackPrefetch: true */ './views/Other')
)
const ChartComponent = loadable(() => import(/* webpackChunkName: "chart" */ './views/Chart'))
const Demo1Component = loadable(() => import(/* webpackChunkName: "demo1" */ './views/Demo1'))
const Demo2Component = loadable(() => import(/* webpackChunkName: "demo2" */ './views/Demo2'))

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
            <li className="app-nav__item">
              <Link to="/demo1">To Demo1</Link>
            </li>
            <li className="app-nav__item">
              <Link to="/demo2">To Demo2</Link>
            </li>
          </ul>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/other" component={OtherComponent}></Route>
          <Route path="/about" component={AboutComponent}></Route>
          <Route path="/chart" component={ChartComponent}></Route>
          <Route path="/demo1" component={Demo1Component}></Route>
          <Route path="/demo2" component={Demo2Component}></Route>
        </Router>
      </div>
    )
  }
}

export default App
