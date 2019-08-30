/** @format */

import * as React from 'react'
import Test from '@components/Test'
import { HashRouter as Router, Route, Link } from 'react-router-dom'
import loadable from '@loadable/component'

const HomeComponent = loadable(() => import(/* webpackChunkName: "home" */ './views/Home'))
const AboutComponent = loadable(() => import(/* webpackChunkName: "about" */ './views/About'))
const OtherComponent = loadable(() => import(/* webpackChunkName: "other" */ './views/Other'))

class App extends React.Component {
  render() {
    console.log(process.env.BASEURL)
    return (
      <div className="app">
        <Router>
          <ul>
            <li>
              <Link to="/">To Home</Link>
            </li>
            <li>
              <Link to="/about">To About</Link>
            </li>
            <li>
              <Link to="/other">To Other</Link>
            </li>
          </ul>
          <Route exact path="/" component={HomeComponent}></Route>
          <Route path="/other" component={OtherComponent}></Route>
          <Route path="/about" component={AboutComponent}></Route>
        </Router>
        <Test />
      </div>
    )
  }
}

export default App
