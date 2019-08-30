import React from 'react'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isPlayer, leaveRoom, saveDrawing } from '../../store/actions'
import { Button } from '@material-ui/core';
import CanvasDraw from 'react-canvas-draw'

export default () => {
    const [player, room, socket, noSleep, drawing] = useSelector(state => [state.playerName, state.room, state.socket, state.noSleep, state.drawing])
    const dispatch = useDispatch()

    const leave = () => {
        noSleep.disable()
        socket.emit('leave-room')
        dispatch(leaveRoom())
    }

    const canvas = useRef(null)

    let interval = null

    useEffect(() => {
        dispatch(isPlayer(1))
        clearInterval(interval)
        interval = setInterval(() => {
            if (drawing === '' || drawing !== canvas.current.getSaveData()) {
                console.log('drawing: ' + drawing, 'canvas: ' + canvas.current.getSaveData())
                dispatch(saveDrawing(canvas.current.getSaveData()))
            }
        }, 1000);
    }, [drawing])

    return (
        <div>
            LOBBY PLAYER
            {room.players.map((player) => {
                return <li>{player.name}</li>
            })}
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
                variant="text"
                onClick={() => {console.log(canvas.current.getSaveData())}}
            >
                Quitter
            </Button>
        </div>
    )
}