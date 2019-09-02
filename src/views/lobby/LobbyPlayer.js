import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isPlayer, leaveRoom } from '../../store/actions'
import { Button } from '@material-ui/core';

export default () => {
    const [player, room, socket, noSleep] = useSelector(state => [state.playerName, state.room, state.socket, state.noSleep])
    const dispatch = useDispatch()

    const leave = () => {
        noSleep.disable()
        socket.emit('leave-room')
        dispatch(leaveRoom())
    }

    useEffect(() => {
        dispatch(isPlayer(1))
    }, [])
//UGSU
    return (
        <div>
            LOBBY PLAYER
            {room.players.map((player) => {
                return <li>{player.name}</li>
            })}
            <Button 
                variant="text"
                onClick={() => {leave()}}
            >
                Quitter
            </Button>
        </div>
    )
}