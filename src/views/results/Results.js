import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CanvasDraw from 'react-canvas-draw'
import { setState, addToState } from '../../store/actions'
import { Box } from '@material-ui/core'
import { VoteCard, Button } from '../../mapper/components'

export default () => {

    const [
        socket,  
        players, 
        step,  
        solutions,
        results
    ] = useSelector(state => [
        state.socket, 
        state.room.players, 
        state.room.step,  
        state.room.solutions,
        state.room.results
    ])
    
    const dispatch = useDispatch()

    let winner = ''

    const getWinner = () => {
        let score = 0
        
        for (let [key, value] of Object.entries(results)) {
            if (value > score) {
                score = value
                winner = key
            }
        }

        return winner
    }

    const showResults = () => {
        return (
            <div className="owner-screen">
                
                {players.map(player =>
                    player.name === getWinner() && 
                    <Box width="100vw" height="60vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <h1 className="big">bravo {player.name}</h1>
                        <VoteCard 
                            player={player.name}
                            name={solutions[player.name].data.name}
                            catch={solutions[player.name].data.catch}
                            drawing={solutions[player.name].drawing}
                        />
                     </Box>
                )}
                <Button
                    id="restart"
                    type="default"
                    value="rejouer"
                    onClick={restart}
                />
            </div>
        )
    }

    const restart = () => {
        socket.emit('restart', [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join("").toUpperCase())
    }

    return (
        <div>
            {showResults()}
        </div>
    )
}