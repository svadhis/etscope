import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import CanvasDraw from 'react-canvas-draw'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [socket, playerName, players, step, played] = useSelector(state => [state.socket, state.playerName, state.room.players, state.problemDefault, state.room.step, state.played])
    const dispatch = useDispatch()

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    let problem = self.entry.problem

    const canvas = useRef(null)

    useEffect(() => {
        
    }, [])
    
    const sendData = () => {
        let drawing = localStorage.getItem('drawing')
        let sendButton = document.querySelector('#send')

        let data = {
            step: 'drawing',
            value: drawing
        }

        //TODO : desactiver le canvas

        dispatch(setState('played', true))
        socket.emit('send-data', data)
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('played', false))
        let interval = setInterval(() => {
            console.log('saved')
            localStorage.setItem('drawing', canvas.current.getSaveData())
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    useEffect(() => {
        step === 'end' && sendData()
    }, [step])

    return (
        <div>
            <h3>{problem}</h3>
            <CanvasDraw 
                ref={canvas}
                lazyRadius={2}
                brushRadius={6}
                hideGrid={true}
                catenaryColor="transparent"
                canvasWidth="100vw"
                canvasHeight="100vw"
            />
            <Button 
                id="send"
                size="large"
                variant="outlined" 
                color="primary" 
                disabled={played}
                onClick={() => {sendData()}}
            >
                VALIDER
            </Button>
        </div>
    )
}