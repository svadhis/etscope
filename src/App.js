import React, { useEffect } from 'react'
import './App.scss'
import { useCurrentWidth } from 'react-socks'
import { useSelector, useDispatch } from 'react-redux'
import { useView } from './methods/hooks'
import * as Actions from './store/actions'
import Ribbon from './components/ribbon/Ribbon'
import Connecting from './components/overview/Connecting'
import Played from './components/overview/Played'
import { withSnackbar } from 'notistack';

// MAIN APP COMPONENT
const App = props => {
  const [
    state,
    roomNumber,
    roomView,
    roomProps,
    socket,
    playerName,
    player,
    owner,
    played,
    connected

  ] = useSelector(state => [
    state, 
    state.room.number,
    state.room.view,
    state.room.props,
    state.socket,
    state.playerName,
    state.player,
    state.owner,
    state.played,
    state.connected
  ])

  const dispatch = useDispatch()

  const width = useCurrentWidth()
  // Set view to Owner or Player depending on 1: state, 2: viewport width. Value 1 = player, 0 = owner
  const viewClient = player === 1 ? 'player' : owner === 1 ? 'owner' : width <= 576 ? 'player' : 'owner'

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
    socket.on('connect', () => {
      if (player === 1) {
        socket.emit('heartbeat', {
          status: 'player',
          room: roomNumber,
          player: playerName
        })
      } 
      else if (owner === 1) {
        socket.emit('heartbeat', {
          status: 'player',
          room: roomNumber,
        })
      } 
    })
  }, [roomNumber])

  useEffect(() => {
    if (connected === 0) {
      props.enqueueSnackbar('Pas de connexion au serveur...', { 
        variant: 'error',
        persist: true,
        preventDuplicate: true,
      })
    }
    else {
      props.closeSnackbar()
    }
  }, [connected])

  return (
    React.createElement("div", {className: 'App'}, 
      React.createElement("div", {className: 'container'}, 
        React.createElement(
          useView(roomView, viewClient),
          { ...roomProps} || null
        )
      ),
      console.log(state),
      roomNumber && owner === 1 && React.createElement(Ribbon),
      played === true && roomView && React.createElement(Played),
      connected === 0 && React.createElement(Connecting)
    )
  )
}

export default withSnackbar(App)

// TODO

// Compresser les dessins

// PWA !

// Gerer les votes : pas deux fois sur le meme
// Faire la page de resultats

// Gerer qu'une deconnexion ne nique pas tout le jeu