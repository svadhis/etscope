import React from 'react'
import { useEffect } from 'react'
import './App.scss'
import io from "socket.io-client"
import { useCurrentWidth } from 'react-socks'
import { useSelector, useDispatch } from 'react-redux'
import { useView } from './methods/hooks'
import * as Actions from './store/actions'
import Ribbon from './components/ribbon/Ribbon'
import Connecting from './components/spinners/Connecting'
import Played from './components/spinners/Played'
import { withSnackbar } from 'notistack';

// MAIN APP COMPONENT
const App = props => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  const socket = state.socket

  const width = useCurrentWidth()
  // Set view to Owner or Player depending on 1: state, 2: viewport width. Value 1 = player, 0 = owner
  const viewClient = state.player === 1 ? 'player' : state.owner === 1 ? 'owner' : width <= 576 ? 'player' : 'owner'

  useEffect(() => {
    socket.on('connect_error', (error) => {
      dispatch(Actions.setState('connected', 0))
    })

    socket.on('connect', () => {
      dispatch(Actions.setState('connected', 1))
    })

    // Listen to action and dispatch it
    socket.on('action', data => {
      const action = Actions[data.action]
      const payload = data.payload
      dispatch(action(payload))
    })

    // Listen to errors and show it
    socket.on('flash', data => {
      (data.target === viewClient || data.target === 'all') && props.enqueueSnackbar(data.message, {variant: data.type, autoHideDuration: 3000})
    })
  }, [])

  useEffect(() => {
    if (state.connected === 0) {
      props.enqueueSnackbar('Pas de connexion au serveur...', { 
        variant: 'error',
        persist: true,
        preventDuplicate: true,
    })
    }
    else {
      props.closeSnackbar()
    }
  }, [state.connected])

  return (
    React.createElement("div", {className: 'App'}, 
      React.createElement("div", {className: 'container'}, 
        React.createElement(
          useView(state.room.view, viewClient),
          { ...state.room.props} || null
        )
      ),
      console.log(state),
      state.room.number && state.owner === 1 && React.createElement(Ribbon),
      state.played === true && state.room.view && React.createElement(Played),
      state.connected === 0 && React.createElement(Connecting)
    )
  )
}

export default withSnackbar(App)

// TODO

// Gerer les votes : pas deux fois sur le meme
// Faire la page de resultats

// Gerer qu'une deconnexion ne nique pas tout le jeu