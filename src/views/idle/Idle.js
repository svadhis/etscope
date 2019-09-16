import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions';
import { Box } from '@material-ui/core';
import { HourglassEmpty } from '@material-ui/icons';

export default () => {
    const [view, playerName, players] = useSelector(state => [state.room.view, state.playerName, state.room.players])
    const dispatch = useDispatch()

    let problem = ''

    if (view === 'GetProblem') {
        let self = {}
        players.forEach(player => {
            if (player.name === playerName ) {
                self = player
            }
        })
        problem = self.entry.problem
    }

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