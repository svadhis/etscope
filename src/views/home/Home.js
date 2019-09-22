import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box } from '@material-ui/core'

import { setState } from '../../store/actions'
import { Button, Title } from '../../mapper/components'

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

    const newRoom = () => {
        const roomNumber = [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join("").toUpperCase()

        // Avoid sleeping device
        noSleep.enable()

        dispatch(setState('owner', 1))
        socket.emit('new-room', roomNumber)
    }

    return (
        <div className="owner-screen">
            <div className="home">    
                <Box className="title-screen" width="100vw" height="100vh" display="flex" flex-direction="column" justifyContent="flex-end" alignItems="center">  
                    <div className="title-text">
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