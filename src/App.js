import React from 'react'
import { useEffect } from 'react'
import './App.css'
import io from "socket.io-client"
import { useCurrentWidth } from 'react-socks'
import { useSelector, useDispatch } from 'react-redux'
import { useView } from './methods/hooks'
import * as Actions from './store/actions'
import Connecting from './components/spinners/Connecting'

// MAIN APP COMPONENT
export default () => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const socket = state.socket

  const width = useCurrentWidth()
  const viewSuffix = state.player === 1 ? 'Player' : state.owner === 1 ? '' : width <= 576 ? 'Player' : ''

  useEffect(() => {
    socket.on('connect_error', (error) => {
      dispatch(Actions.isConnected(0))
    })

    socket.on('connect', () => {
      dispatch(Actions.isConnected(1))
    })

    // Listen to action and dispatch it
    socket.on('action', data => {
      const action = Actions[data.action]
      const payload = data.payload
      dispatch(action(payload))
    })
  }, [])

  return (
    React.createElement("div", null, 
      React.createElement("div", {className: 'container'}, 
        React.createElement(
          useView(state.room.view, viewSuffix),
          { ...state.room.props } || null
        )
      ),
      state.connected === 0 && React.createElement(Connecting)
    )
  )
}