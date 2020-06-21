/** @format */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// import 'antd/dist/antd.css'
import 'antd/dist/antd.css'
import './styles/reset.css'
import './index.scss'

ReactDOM.render(<App />, document.getElementById('root'))

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(registration => {
//         console.log('SW registered: ', registration)
//         registration.pushManager.subscribe({ userVisibleOnly: true }).catch(error => console.log(error))
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError)
//       })
//   })
// }
