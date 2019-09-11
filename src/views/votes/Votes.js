import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import CanvasDraw from 'react-canvas-draw'
import { setState, addToState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'

export default () => {

    const [
        socket,  
        timer,
        players, 
        step,  
        solutions
    ] = useSelector(state => [
        state.socket, 
        state.timer,
        state.room.players, 
        state.room.step,  
        state.room.solutions
    ])
    
    const dispatch = useDispatch()

    const showVotes = () => {
        return (
            <div>
                {players.map(player =>
                    <div>
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

    useEffect(() => {
        dispatch(setState('timer', 0))   
    }, [])
            
    useEffect(() => {
        if (timer >= 100) {
            socket.emit('end-step')
        } 

        let timeout = setTimeout(() => {  
            dispatch(setState('timer', timer + 1))
        }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [timer, step])

    return (
        <div>
            <LinearProgress variant="determinate" value={timer} />
            {showVotes()}
        </div>
    )
}