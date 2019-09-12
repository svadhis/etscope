import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import CanvasDraw from 'react-canvas-draw'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [socket, playerName, players, step, brush, played] = useSelector(state => [state.socket, state.playerName, state.room.players, state.room.step, state.brush, state.played])
    const dispatch = useDispatch()

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    let problem = self.entry.problem

    const canvas = useRef(null)
    
    const sendData = () => {
        let drawing = canvas.current.getSaveData()

        let data = {
            step: 'drawing',
            value: drawing
        }

        dispatch(setState('played', true))
        socket.emit('send-data', data)
    }

    const setColor = color => {
        dispatch(setState('brush', color))
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('played', false))

        /* let interval = setInterval(() => {
            localStorage.setItem('drawing', canvas.current.getSaveData())
        }, 1000)
        return () => {
            clearInterval(interval)
        } */

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
                brushRadius={4}
                brushColor={brush}
                hideGrid={true}
                catenaryColor="transparent"
                canvasWidth={window.innerWidth}
                canvasHeight={window.innerWidth}
                disabled={played}
            />
            <Button 
                id="undo"
                variant="outlined" 
                color="primary" 
                onClick={() => {canvas.current.undo()}}
            >
                CORRIGER
            </Button>
            <Button 
                id="default-color"
                variant="outlined" 
                color="primary" 
                onClick={() => {setColor('#444')}}
            >
                NOIR
            </Button>
            <Button 
                id="red"
                variant="outlined" 
                color="primary" 
                onClick={() => {setColor('#F00')}}
            >
                ROUGE
            </Button>
            <Button 
                id="green"
                variant="outlined" 
                color="primary" 
                onClick={() => {setColor('#0F0')}}
            >
                VERT
            </Button>
            <Button 
                id="blue"
                variant="outlined" 
                color="primary" 
                onClick={() => {setColor('#00F')}}
            >
                BLEU
            </Button>
            <Button 
                id="yellow"
                variant="outlined" 
                color="primary" 
                onClick={() => {setColor('#FF0')}}
            >
                JAUNE
            </Button>
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