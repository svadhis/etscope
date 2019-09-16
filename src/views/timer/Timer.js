import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core';

export default () => {

    const [
        socket, 
        instructions,
        timer, 
        view, 
        step, 
        presenting
    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.timer, 
        state.room.view, 
        state.room.step, 
        state.room.presenting
    ])

    const dispatch = useDispatch()

    let speed = 1

    switch (view) {
        case 'MakeProblem':
            speed = 50
            break

        case 'MakeDrawing':
            speed = 20
            break

        case 'MakeData':
            speed = 50
            break

        case 'MakeVote':
            speed = 50
            break

        case 'StartPresentation':
            speed = 80
            break

        default:
            speed = 50
            break
    }

    useEffect(() => {
        dispatch(setState('timer', instructions === true ? -15 : 0))   
    }, [])
            
    useEffect(() => {
        if (timer >= 100) {
            socket.emit('end-step')
        } 

        let timeout = setTimeout(() => {  
            dispatch(setState('timer', timer + (speed / 100)))
        }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [timer, step])

    return (
        <div className="owner-screen">
            <LinearProgress variant="determinate" value={timer} />
            <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
                {view === 'StartPresentation' ?
                <div>
                    <h1 className="big">C'est à toi</h1>
                    <h1 className="very-big">{presenting}</h1>
                </div> :
                <h1 className="big">tic tac tic tac</h1>}
            </Box>
        </div>
    )
}