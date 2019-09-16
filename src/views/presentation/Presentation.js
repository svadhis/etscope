import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import CanvasDraw from 'react-canvas-draw'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core';

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
            <div className="owner-screen">
                <Box height="100vh" display="flex" justifyContent="space-evenly" alignItems="center">
                    <Box width="45vw" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        {presentation.steps[0] &&
                        <h1 className="very-big">{presentation.data.name}</h1>}
                        {presentation.steps[1] &&
                        <h1>{presentation.data.catch}</h1>}
                    </Box>
                    <Box width="45vw" display="flex" justifyContent="center" alignItems="center">
                        {presentation.steps[2] &&
                        <CanvasDraw 
                            hideGrid={true}
                            canvasWidth={Math.round(window.innerWidth * 0.4)}
                            canvasHeight={Math.round(window.innerWidth * 0.4)}
                            disabled={true}
                            saveData={presentation.drawing}
                            immediateLoading={true}
                        />}
                    </Box>
                </Box>
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