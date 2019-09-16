import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core'
import { Button } from '../../mapper/components'

export default () => {
    const [room, socket] = useSelector(state => [state.room, state.socket])
    const dispatch = useDispatch()

    const start = () => {
        socket.emit('start-game')
    }

    useEffect(() => {
        dispatch(setState('owner', 1))
    }, [])

    return (
        <div className="owner-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly">
                <h1>rejoignez la partie !</h1>
                <Box className="lobby-player-list" display="flex" flexWrap="wrap" justifyContent="space-evenly">
                    {room.players.map((player, i) => (
                        <Button 
                            type="default"
                            id={'player-' + i}
                            value={player.name}
                        />
                    ))}
                </Box>
            </Box>
        </div>
    )
}