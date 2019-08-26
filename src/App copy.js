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
  // Set view to Owner or Player depending on 1: state, 2: viewport width. Value 1 = player, 0 = owner
  const viewSuffix = state.player === 1 ? 1 : state.owner === 1 ? 0 : width <= 576 ? 1 : 0

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

    // Listen to errors and show it
    socket.on('flash', data => {
      let element = document.querySelector('.flash-message')
      element.classList.add('flash-' + data.type)
      element.innerHTML = data.message
      element.style.display = "block"
      setTimeout(() => {
        element.style.display = "none"
      }, 2000);
    })
  }, [])

  return (
    React.createElement("div", null, 
      React.createElement("div", {className: 'flash-message'}),
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