import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isPlayer, leaveRoom } from '../../store/actions'
import { Button } from '@material-ui/core';

export default () => {
    const [player, room, socket] = useSelector(state => [state.playerName, state.room, state.socket])
    const dispatch = useDispatch()

    const leave = () => {
        socket.emit('leave-room', {room: room.number, player: player})
        dispatch(leaveRoom())
    }

    useEffect(() => {
        dispatch(isPlayer(1))
    }, [])

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