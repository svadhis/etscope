import React from 'react'
import { useEffect } from 'react'

import socketIOClient from "socket.io-client"
import { useSelector, useDispatch } from 'react-redux'

import component from './mapper/components'
import * as Actions from './store/actions'

// MAIN APP COMPONENT
export default () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    // Init websocket connection to server
    const endpoint = 'http://127.0.0.1:4001'
    const socket = socketIOClient(endpoint)

    // Listen to action and dispatch it
    socket.on('action', data => {
      const action = Actions[data.action]
      const payload = data.payload
      dispatch(action(payload))
    });
  }, [])

  return React.createElement(component(state.room.component || 'home'))
}