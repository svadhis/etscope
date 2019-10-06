import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useCurrentWidth } from 'react-socks'
import { withSnackbar } from 'notistack'

import * as Actions from './store/actions'
import setView from './methods/setView'
import { Ribbon, Connecting, Loading, Played, Sound } from './mapper/components'

import './App.scss'

export default withSnackbar(props => {

  const [
    roomNumber,
    roomView,
    roomProps,
    roomLoaded,
    socket,
    playerName,
    player,
    owner,
    played,
    connected,
    noSleep,
    exit
  ] = useSelector(state => [
    state.room.number,
    state.room.view,
    state.room.props,
    state.room.loaded,
    state.socket,
    state.playerName,
    state.player,
    state.owner,
    state.played,
    state.connected,
    state.noSleep,
    state.exit
  ])

  const dispatch = useDispatch()

  // Set view to Owner or Player depending on 1: state, 2: viewport width
  const width = useCurrentWidth()
  const viewClient = player === 1 ? 'player' : owner === 1 ? 'owner' : width <= 576 ? 'player' : 'owner'

  // Handle back button : for players only, pressing back button displays a message, second press leaves the game
  const popState = () => {
    if (player === 1) {
      if (roomView === 'Home') {
        props.enqueueSnackbar("encore une fois pour quitter l'application", {variant: 'info', autoHideDuration: 2000})
        setTimeout(() => {
            window.history.pushState({}, '')
        }, 2000)
      }
      else {
        if (exit === false) {
          dispatch(Actions.toggleState('exit'))
          props.enqueueSnackbar("encore une fois pour quitter la partie", {variant: 'info', autoHideDuration: 2000})
          setTimeout(() => {
              window.history.pushState({}, '')
              dispatch(Actions.toggleState('exit'))
          }, 2000)
          
        }
        else {
          noSleep.disable()
          socket.emit('leave-room')
          dispatch(Actions.reinitState())
        }
      }
    }
  }

  // On mount
  useEffect(() => {
    // Remove mobile restrictions to play multiple sounds 
    window.soundManager.setup({debugMode: false, ignoreMobileRestrictions: true});
                
    // Push state to navigation history to prevent leaving pressing back button
    window.history.pushState({}, '')

    // Socket listeners
    socket.on('connect_error', (error) => {
      dispatch(Actions.setState('connected', 0))
    })

    socket.on('connect', () => {
      dispatch(Actions.setState('connected', 1))
    })

    // Listen to action from server and dispatch it
    socket.on('action', data => {
      const action = Actions[data.action]
      const payload = data.payload
      dispatch(action(payload))
    })

    // Listen to snack messages from server and pop it
    socket.on('flash', data => {
      (data.target === viewClient || data.target === 'all') && props.enqueueSnackbar(data.message, {variant: data.type, autoHideDuration: 3000})
    })
  }, [])

  useEffect(() => {
    // Handle reconnection to server
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
    // Listen to browser navigation (back button)
    window.addEventListener('popstate', popState)
    return () => {
      window.removeEventListener('popstate', popState)
    }
  }, [roomView])

  useEffect(() => {
    // Handle disconnection snack
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
    React.createElement("div", {className: 'App ' + viewClient}, 
      React.createElement("div", {className: 'container'}, 
        // Show loading screen or view
        (roomLoaded || roomView === 'Home') ?
        React.createElement(
          setView(roomView, viewClient),
          { ...roomProps} || null
        ) :
        React.createElement(Loading)
      ),
      React.createElement(Sound, {owner: owner}),
      // Show ribbon when room is opened and client is owner
      roomNumber && owner === 1 && React.createElement(Ribbon),
      // Show played screen on player client
      played === true && roomView && React.createElement(Played),
      // Show connecting screen when disconnected
      connected === 0 && React.createElement(Connecting)
    )
  )
})

// TODO LIST

// Sound : handle sound not playing on mobile devices

// MakeDrawing : use compression to reduce drawing size (LZ string)
// App : Back button handling not working as expected
// MakeData, MakeProblem : use state instead of input.value