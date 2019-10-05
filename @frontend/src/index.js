import React from 'react'
import {render} from 'react-dom'
import "antd/dist/antd.css"
import 'core-js/es6/string'
import App from './App'
// import { Provider } from "react-redux";
// import store from "./redux/store";



// render(<Provider store={store}><App/></Provider>, document.querySelector('#app'))

render(<App/>, document.querySelector('#app'))
