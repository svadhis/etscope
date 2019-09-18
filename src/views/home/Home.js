import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import { setState } from '../../store/actions'
import './Home.scss'
import  { Breakpoint } from 'react-socks';
import { Box } from '@material-ui/core'
import { Button, Title } from '../../mapper/components'

export default () => {

    const [socket, noSleep] = useSelector(state => [state.socket, state.noSleep])

    const dispatch = useDispatch()

    const newRoom = () => {
        noSleep.enable()
        dispatch(setState('owner', 1))
        socket.emit('new-room', [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join("").toUpperCase())
    }

    return (
        <div className="owner-screen">
            <div className="home">
                    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                    <div className="title-screen">
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
        </div>
    )
}