import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box } from '@material-ui/core'

import { joinRoom } from '../../store/actions'
import { Label } from '../../mapper/components'

export default () => {
    
    const players = useSelector(state => state.room.players)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(joinRoom())
    }, [])

    return (
        <div className="owner-screen">
            <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly">
                <h1>rejoignez la partie !</h1>
                <Box className="lobby-player-list" display="flex" flexWrap="wrap" justifyContent="space-evenly">
                    {players.map((player, i) => (
                        <Label
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