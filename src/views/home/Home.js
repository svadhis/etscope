import React, { useEffect } from 'react'
import snabbt from 'snabbt.js'
import { useSelector } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import  { Breakpoint } from 'react-socks';
import { newRoom, startRoom } from '../../mapper/orders'
import { Box, Button } from '@material-ui/core'

export default () => {

    const [socket, noSleep] = useSelector(state => [state.socket, state.noSleep])

    const newRoom = () => {
        noSleep.enable()
        socket.emit('new-room', [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join("").toUpperCase())
    }

    useEffect(() => {
        let element = document.querySelector('.Home')
        snabbt(element, {
            position: [0, 100, 0]
          });
    }, [])

    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <div className="Home">
            <div>
                <h1 className="game-title">
                GAME-3000
                </h1>
                <Button 
                id="send"
                size="large"
                variant="outlined" 
                onClick={() => {newRoom()}}
                color="primary" 
                >
                NOUVELLE PARTIE
                </Button>
            </div>   
            </div>
        </Box>
    )
}