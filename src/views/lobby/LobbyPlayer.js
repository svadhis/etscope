import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core';
import { Button } from '../../mapper/components';

export default () => {
    const [
        player, 
        room, 
        socket, 
        noSleep
    ] = useSelector(state => [
        state.playerName, 
        state.room, 
        state.socket, 
        state.noSleep
    ])
    
    const dispatch = useDispatch()

    const leave = () => {
        noSleep.disable()
        socket.emit('leave-room')
        dispatch(setState('room', {view: 'Home'}))
    }

    const start = () => {
        socket.emit('start-game')
    }

    return (
        <div className="player-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly">
                
                {room.players[0].name === player &&
                <div>
                <label className="player-label"> INSTRUCTIONS
                    <input type="checkbox" checked={room.instructions} onClick={() => {socket.emit('toggle-instructions', !room.instructions)}} />
                    <span className="checkmark"></span>
                </label>
                <label className="player-label"> SOUS TITRES
                    <input type="checkbox" checked={room.subtitles} onClick={() => {socket.emit('toggle-subtitles', !room.subtitles)}} />
                    <span className="checkmark"></span>
                </label>
                </div>}
                {(room.players[0].name === player && room.players.length >= 1) &&
                <Button
                    id="start"
                    type="default"
                    value="démarrer"
                    onClick={start}
                />}
                <Button
                    id="start"
                    type="default"
                    value="quitter"
                    onClick={leave}
                />
            </Box>
        </div>
    )
}