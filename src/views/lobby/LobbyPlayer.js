import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isPlayer } from '../../store/actions'

export default () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isPlayer(1))
    }, [])

    return (
        <div>
            {console.log(state)}
            LOBBY PLAYER
            {state.room.players.map((player) => {
                return <li>{player.name}</li>
            })}
        </div>
    )
}