import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box } from '@material-ui/core'
import { HourglassEmpty } from '@material-ui/icons'

import { setState } from '../../store/actions'
import Button from '../../components/button/Button'

import './Play.scss'

export default () => {

    const [
        socket, 
        instructions,
        showIns,
        playerName, 
        step,
        presenting
    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.showIns,
        state.playerName, 
        state.room.step,
        state.room.presenting
    ])

    const dispatch = useDispatch()

    const renderStart = () => {
        if (presenting === playerName) {
            if (instructions === showIns === true) {
                return (
                    <div className="player-screen">
                        <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                            <h2>Fais une présentation de ton objet, tu peux afficher sur l'écran principal les éléments de ton projet dans l'ordre de ton choix.</h2>
                            <h2>Sois démonstratif et enthousiaste, tu dois convaincre le comité que ton idée est géniale ! </h2>
                        </Box>
                    </div>
                )
            }
            else {
                return (
                    <div className="player-screen">
                        <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                            <h3>à toi de jouer !</h3>
                            <Button
                                id="start"
                                type="default"
                                value="commencer"
                                onClick={sendData}
                            />
                        </Box>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <HourglassEmpty />
                    </Box>
                </div>
            )
        }
    }

    const sendData = () => {    
        socket.emit('set-view', 'MakePresentation')
    }

    useEffect(() => {
        if (presenting === playerName) {
            navigator.vibrate(Array(5).fill(100))

            instructions === showIns === true && setTimeout(() => {
                dispatch(setState('showIns', false))
            }, 6000)
        } 

        return () => dispatch(setState('showIns', true))
    }, [])

    useEffect(() => {
        if (step === 'end') {
            sendData()
        }
    }, [step])

    return (
        <div className="play">
            {renderStart()}
        </div>
    )
}