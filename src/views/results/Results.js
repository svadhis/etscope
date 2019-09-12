import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import CanvasDraw from 'react-canvas-draw'
import { setState, addToState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'

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

    const showVotes = () => {
        return (
            <div>
                {players.map(player =>
                    <div>
                        {results[player.name]}
                        <h4>{player.name}</h4>
                        <h3>{solutions[player.name].data.name}</h3>
                        <h5>{solutions[player.name].data.catch}</h5>
                        <CanvasDraw 
                        hideGrid={true}
                        canvasWidth={Math.round(window.innerHeight * 0.2)}
                        canvasHeight={Math.round(window.innerHeight * 0.2)}
                        disabled={true}
                        saveData={solutions[player.name].drawing}
                        immediateLoading={true}
                    />
                    </div>
                )}
            </div>
        )
    }

    const restart = () => {
        socket.emit('restart')
    }

    return (
        <div>
            {showVotes()}
            <Button 
                id="restart"
                size="large"
                variant="outlined" 
                color="primary" 
                onClick={() => {restart()}}
            >
                RELANCER UNE PARTIE
            </Button>
        </div>
    )
}