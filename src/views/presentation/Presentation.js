import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import CanvasDraw from 'react-canvas-draw'
import { Box } from '@material-ui/core'

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
            <div className="owner-screen">
                <h1>probleme : {presentation.problem}</h1>
                <Box height="85vh" display="flex" justifyContent="space-evenly" alignItems="center">
                    <Box width="45vw" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">              
                        <h1 className="very-big">{presentation.steps[0] ? presentation.data.name : ''}</h1>
                        <h1>{presentation.steps[1] ? presentation.data.catch : ''}</h1>
                    </Box>
                    <Box width="45vw" display="flex" justifyContent="center" alignItems="center">
                        {presentation.steps[2] ?
                        <CanvasDraw 
                            hideGrid={true}
                            canvasWidth={Math.round(window.innerWidth * 0.36)}
                            canvasHeight={Math.round(window.innerWidth * 0.36)}
                            disabled={true}
                            saveData={presentation.drawing}
                            immediateLoading={true}
                        /> : ''}
                    </Box>
                </Box>
            </div>
        )
    }

    useEffect(() => {
        dispatch(setState('timer', 0))   
    }, [])
            
    useEffect(() => {
        let timeout = timer >= 100 ?
        setInterval(() => {
            socket.emit('end-step')
        }, 2000) :
        setTimeout(() => {
            dispatch(setState('timer', timer + 0.2))
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