import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import  { Breakpoint } from 'react-socks';
import { newRoom, startRoom } from '../../mapper/orders'
import { Box } from '@material-ui/core'
import { Button, Title } from '../../mapper/components'

export default () => {

    const [socket, noSleep] = useSelector(state => [state.socket, state.noSleep])

    const newRoom = () => {
        noSleep.enable()
        socket.emit('new-room', [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join("").toUpperCase())
    }

    return (
        <div className="home owner-screen">
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
            <div>
                <Title size="very-big" />
                <Button
                    id="send"
                    type="home"
                    value="nouvelle partie"
                    onClick={newRoom}
                />
            </div>   
            </Box>
        </div>
    )
}