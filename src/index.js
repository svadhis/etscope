import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { Provider } from 'react-redux'
import store from './store/store'

import  { BreakpointProvider } from 'react-socks';

ReactDOM.render(
    <Provider store={store}>
         <BreakpointProvider>
            <App />
         </BreakpointProvider>   
    </Provider>, 
    document.getElementById('root')
)

serviceWorker.unregister()
