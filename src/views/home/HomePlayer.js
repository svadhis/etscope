import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import { isPlayer } from '../../store/actions'
import { joinRoom } from '../../mapper/orders'
import { Button, TextField } from '@material-ui/core'

export default () => {

    const [socket, noSleep] = useSelector(state => [state.socket, state.noSleep])
    const dispatch = useDispatch()

    const join = () => {
        noSleep.enable()
        dispatch(isPlayer(1, document.querySelector('input#name').value.toUpperCase()))
        socket.emit('join-room', {
            room: document.querySelector('input#room').value.toUpperCase(),
            player: document.querySelector('input#name').value.toUpperCase()
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