import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import HttpsRedirect from 'react-https-redirect'

import { Provider } from 'react-redux'
import store from './store/store'

import  { BreakpointProvider } from 'react-socks'
import { SnackbarProvider } from 'notistack'
import { CookiesProvider } from 'react-cookie'

ReactDOM.render(

        <Provider store={store}>
            <BreakpointProvider>
                <SnackbarProvider maxSnack={3}>
                    <CookiesProvider>
                        <App />
                    </CookiesProvider>
                </SnackbarProvider>
            </BreakpointProvider>   
        </Provider>,
    document.getElementById('root')
)

serviceWorker.register()
