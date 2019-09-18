import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './Home.scss'
import { isPlayer, setState } from '../../store/actions'
import { Box } from '@material-ui/core'
import { Button, Title, Input } from '../../mapper/components'
import { useCookies } from 'react-cookie'

export default () => {

    const [socket, player, noSleep] = useSelector(state => [state.socket, state.playerName, state.noSleep])

    const [cookie, setCookie] = useCookies(['name']);

    const dispatch = useDispatch()

    const setName = e => {
        dispatch(setState('playerName', e.target.value))
    }

    const join = () => {
        let room = document.querySelector('input#room').value.toUpperCase()
        noSleep.enable()
        setCookie('name', player, { path: '/' });
        dispatch(isPlayer(1, player))
        socket.emit('join-room', {
            room: room,
            player: player
        })
    }

    const focus = () => {
        document.querySelector('input#room').focus()
    }

    useEffect(() => {
        cookie.name && dispatch(setState('playerName', cookie.name))
    }, [])

    return (
        <div className="homeplayer player-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                <Title size="big" />
                <div className="player-join">
                    <div>
                        <Input type="home" id="name" placeholder="nom" value={player} onChange={setName} onKeyPress={focus} />
                    </div> 
                    <div>
                        <Input type="home" id="room" placeholder="room" onKeyPress={join} />
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