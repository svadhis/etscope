import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import CanvasDraw from 'react-canvas-draw'
import { setState } from '../../store/actions'

export default () => {

    const [
        socket, 
        timer,
        step,
        presentation
    ] = useSelector(state => [
        state.socket, 
        state.timer, 
        state.room.step,
        state.room.presentation
    ])

    const dispatch = useDispatch()

    const showPresentation = () => {
        return (
            <div>
                {presentation.steps[0] &&
                <div>
                    <h1>{presentation.data.name}</h1>
                </div>}
                {presentation.steps[1] &&
                <div>
                    <h3>{presentation.data.catch}</h3>
                </div>}
                {presentation.steps[2] &&
                <div>
                    <CanvasDraw 
                        hideGrid={true}
                        canvasWidth={Math.round(window.innerHeight * 0.7)}
                        canvasHeight={Math.round(window.innerHeight * 0.7)}
                        disabled={true}
                        saveData={presentation.drawing}
                    />
                </div>}
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
            {showPresentation()}
        </div>
    )
}