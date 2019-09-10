import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions';

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
        <div>
            {problem}
        </div>
    )
}