import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Box } from '@material-ui/core'
import { HourglassEmpty } from '@material-ui/icons'

export default () => {
    
    const [
        view, 
        playerName, 
        players
    ] = useSelector(state => [
        state.room.view, 
        state.playerName, 
        state.room.players
    ])

    let problem = ''

    if (view === 'GetProblem') {
        players.forEach(player => {
            if (player.name === playerName ) {
                problem = player.entry.problem
            }
        })
    }

    useEffect(() => {
        view === 'GetProblem' && navigator.vibrate(Array(5).fill(100))
    }, [])

    return (
        <div className="player-screen">
            <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
                {view === 'GetProblem' ?
                <h1 className="big">{problem}</h1> :
                <HourglassEmpty />}
            </Box>
        </div>
    )
}