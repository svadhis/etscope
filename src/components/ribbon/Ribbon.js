import React from 'react'
import { useSelector } from 'react-redux'
import './Ribbon.scss'

export default () => {
    const room = useSelector(state => state.room.number)

    return (
        <div className="room-ribbon">
            {room}
        </div>
    )
}