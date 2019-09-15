import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Button } from '@material-ui/core';

export default () => {
    const [room, socket] = useSelector(state => [state.room, state.socket])
    const dispatch = useDispatch()

    const start = () => {
        socket.emit('start-game')
    }

    useEffect(() => {
        dispatch(setState('owner', 1))
    }, [])

    return (
        <div>
            LOBBY OWNER : {room.number}
            <div>
                {room.players.map((player, i) => {
                    return <li key={i}>{player.name}</li>
                })}
            </div>
            {room.players.length >= 0 && 
            <Button onClick={() => {start()}}>
                Lancer la partie
            </Button>}
        </div>
    )
}