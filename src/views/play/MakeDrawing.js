import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import CanvasDraw from 'react-canvas-draw'
import { Button, ColorButton } from '../../mapper/components'
import './Play.scss'
import { Box } from '@material-ui/core'

export default () => {

    const [
        socket,
        instructions,
        showIns,
        playerName,
        players,
        step,
        brush,
        played
    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.showIns,
        state.playerName, 
        state.room.players, 
        state.room.step, 
        state.brush, 
        state.played])
    const dispatch = useDispatch()

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    let problem = self.entry.problem

    const canvas = useRef(null)

    const renderDrawing = () => {
        if (instructions === showIns === true) {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h2>Tu dois résoudre le problème qui t'a été assigné.</h2>
                        <h2>Tu as quelques minutes pour imaginer une solution et dessiner ton objet.</h2>
                        <h2>Sois créatif, un bon ingénieur est un ingénieur inspiré !</h2>
                    </Box>
                </div>
            )
        }
        else {
            return (
                <div className="drawing player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                    <h3>{problem}</h3>
                    <div className="player-canvas">
                        <CanvasDraw 
                            ref={canvas}
                            lazyRadius={1}
                            brushRadius={4}
                            brushColor={brush}
                            hideGrid={true}
                            catenaryColor="transparent"
                            canvasWidth={window.innerWidth * 0.9}
                            canvasHeight={window.innerWidth * 0.9}
                            disabled={played}
                        />
                    </div>
                    <Box width="100vw" display="flex" justifyContent="space-evenly">
                        <ColorButton value="undo" onClick={undo}/>
                        <ColorButton value="default" color="#444" onClick={setColor} />
                        <ColorButton value="red" color="#F00" onClick={setColor} />
                        <ColorButton value="green" color="#0F0" onClick={setColor} />
                        <ColorButton value="blue" color="#00F" onClick={setColor} />
                        <ColorButton value="yellow" color="#FF0" onClick={setColor} />
                    </Box>                 
                    <Button 
                        id="send"
                        type="default"
                        value="valider"
                        onClick={sendData}
                        disabled={played}
                    />
                    </Box>
                </div>
            )
        }
    }
    
    const sendData = () => {
        let drawing = canvas.current.getSaveData()

        let data = {
            step: 'drawing',
            value: drawing
        }

        dispatch(setState('played', true))
        socket.emit('send-data', data)
    }

    const undo = () => {
        canvas.current.undo()
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

        instructions === showIns === true && setTimeout(() => {
            dispatch(setState('showIns', false))
        }, 6000)
        
        return () => {
            dispatch(setState('played', false))
            dispatch(setState('showIns', true))
        }
    }, [])

    useEffect(() => {
        if (step === 'end' && played === false) {
            sendData()
        }
    }, [step])

    return (
        <div>
            {renderDrawing()}
        </div>
    )
}