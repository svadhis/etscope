import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import { joinRoom } from '../../mapper/orders'
import { Button, TextField } from '@material-ui/core'

export default () => {

    const socket = useSelector(state => state.socket)

    const join = () => {
        socket.emit('join-room', {
            room: document.querySelector('input#room').value,
            player: document.querySelector('input#name').value
        })
    }

    return (
        <div>
            <div className="HomePlayer">
                <TextField id="name" label="Nom" />
                <TextField id="room" label="Room" />
                
                <Button 
                    size="large"
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {join()}}
                >
                    REJOINDRE LA PARTIE
                </Button>
            
            </div>
        </div>
    )
}