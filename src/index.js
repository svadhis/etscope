import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import HttpsRedirect from 'react-https-redirect'
import { BreakpointProvider } from 'react-socks'
import { SnackbarProvider } from 'notistack'
import { CookiesProvider } from 'react-cookie'

import * as serviceWorker from './serviceWorker'
import store from './store/store'
import App from './App'

import './index.css'

ReactDOM.render(
    <HttpsRedirect>
        <Provider store={store}>
            <BreakpointProvider>
                <SnackbarProvider maxSnack={3}>
                    <CookiesProvider>
                        <App />
                    </CookiesProvider>
                </SnackbarProvider>
            </BreakpointProvider>   
        </Provider>
    </HttpsRedirect>,
    document.getElementById('root')
)

serviceWorker.register()
