import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import { isPlayer } from '../../store/actions'
import { joinRoom } from '../../mapper/orders'
import { Box } from '@material-ui/core'
import { Button, Title, Input } from '../../mapper/components'

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

    const focus = () => {
        document.querySelector('input#room').focus()
    }

    return (
        <div className="home player-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Title size="big" />
                <div className="player-join">
                    <div>
                        <Input type="home" id="name" value="nom" onKeyPress={focus} />
                    </div> 
                    <div>
                        <Input type="home" id="room" value="room" onKeyPress={join} />
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