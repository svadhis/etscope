import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isOwner } from '../../store/actions'
import { Button } from '@material-ui/core';

export default () => {
    const room = useSelector(state => state.room)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isOwner(1))
    }, [])

    return (
        <div>
        LOBBY OWNER : {room.number}
        <div>
            {room.players.map((player) => {
                return <li>{player.name}</li>
            })}
        </div>
        {room.players.length >= 3 && <Button>Lancer la partie</Button>}
    </div>
    )
}