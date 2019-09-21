import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useCookies } from 'react-cookie'
import { Box } from '@material-ui/core'

import { isPlayer } from '../../store/actions'
import { Button, Title, Input } from '../../mapper/components'

import './Home.scss'

export default () => {

    const [
        socket, 
        noSleep
    ] = useSelector(state => [
        state.socket, 
        state.noSleep
    ])

    const dispatch = useDispatch()

    // Local state for input handling
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const [cookie, setCookie] = useCookies(['name'])

    const join = () => {
        // Avoid sleeping device
        noSleep.enable()

        setCookie('name', name, { path: '/' })

        dispatch(isPlayer(1, name))

        socket.emit('join-room', {
            room: room.toUpperCase(),
            player: name.toUpperCase()
        })
    }

    const focus = () => {
        document.querySelector('input#room').focus()
    }

    useEffect(() => {
        cookie.name && setName(cookie.name)
    }, [])

    return (
        <div className="homeplayer player-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Title size="big" />
                <div className="player-join">
                    <div>
                        <Input type="home" id="name" placeholder="nom" value={name} onChange={e => {setName(e.target.value)}} onKeyPress={focus} />
                    </div> 
                    <div>
                        <Input type="home" id="room" placeholder="room" value={room} onChange={e => {setRoom(e.target.value)}} onKeyPress={join} />
                    </div>
                </div>
                <Button
                    id="send"
                    type="homeplayer"
                    value="rejoindre"
                    onClick={join}
                />
            </Box>
        </div>
    )
}