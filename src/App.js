import React, { useEffect } from 'react'
import './App.scss'
import { useCurrentWidth } from 'react-socks'
import { useSelector, useDispatch } from 'react-redux'
import { setView } from './methods/hooks'
import * as Actions from './store/actions'
import { Ribbon, Connecting, Loading, Played } from './mapper/components'
import { withSnackbar } from 'notistack'
import Sound from './components/sound/Sound'

// MAIN APP COMPONENT
const App = props => {
  const [
    state,
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
    state, 
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

  const width = useCurrentWidth()
  // Set view to Owner or Player depending on 1: state, 2: viewport width. Value 1 = player, 0 = owner
  const viewClient = player === 1 ? 'player' : owner === 1 ? 'owner' : width <= 576 ? 'player' : 'owner'

  // Handle back button
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

  

  useEffect(() => {
    window.history.pushState({}, '')

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
      window.addEventListener('popstate', popState)
      return () => {
        window.removeEventListener('popstate', popState)
      }
  }, [roomView])

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
    
    React.createElement("div", {className: 'App ' + viewClient}, 
      React.createElement("div", {className: 'container'}, 
        (roomLoaded || roomView === 'Home') ?
        React.createElement(
          setView(roomView, viewClient),
          { ...roomProps} || null
        ) :
        React.createElement(Loading)
      ),
      console.log(state),
      React.createElement(Sound, {owner: owner}),
      roomNumber && owner === 1 && React.createElement(Ribbon),
      played === true && roomView && React.createElement(Played),
      connected === 0 && React.createElement(Connecting)
    )
  )
}

export default withSnackbar(App)

// TODO

// Compresser les dessins

// Gerer les votes : pas deux fois sur le meme
// Faire la page de resultats