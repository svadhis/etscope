import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import LinearProgress from '@material-ui/core/LinearProgress'
import { Box } from '@material-ui/core'

import { setState } from '../../store/actions'

export default () => {

    const [
        socket, 
        instructions,
        timer, 
        view, 
        step, 
        presenting,
        presentOrder,

    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.timer, 
        state.room.view, 
        state.room.step, 
        state.room.presenting,
        state.room.presentOrder,
    ])

    const dispatch = useDispatch()

    let speed = 1

    switch (view) {
        case 'MakeProblem':
            speed = 40
            break

        case 'MakeDrawing':
            speed = 15
            break

        case 'MakeData':
            speed = 25
            break

        case 'MakeVote':
            speed = 40
            break

        case 'StartPresentation':
            speed = 60
            break

        case 'GetProblem':
            speed = 240
            break

        case 'EndPresentation':
            speed = 480
            break

        default:
            speed = 50
            break
    }

    useEffect(() => {
        dispatch(setState('timer', instructions === true ? -15 : 0))   
        return () => dispatch(setState('timer', instructions === true ? -15 : 0))   
    }, [view])
            
    useEffect(() => {
        let timeout = timer >= 100 ?
            view === 'GetProblem' ? setTimeout(() => { socket.emit('set-view', 'MakeDrawing') }, 100) :
            view === 'EndPresentation' ? setTimeout(() => { 
                presentOrder[0] ?
                    socket.emit('set-view', 'StartPresentation') :
                    socket.emit('set-view', 'VotingStep')
            }, 100) :
            setInterval(() => { socket.emit('end-step') }, 2000) :
        setTimeout(() => { dispatch(setState('timer', timer + (speed / 100))) }, 100)     
        
        return () => {
            clearTimeout(timeout)
        }
    }, [timer, step])

    return (
        <div className="owner-screen">
            {view !== 'GetProblem' && view !== 'EndPresentation' && <LinearProgress variant="determinate" value={timer} />}
            <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
                {view === 'StartPresentation' ?
                <div>
                    <h1 className="big">C'est à toi</h1>
                    <h1 className="very-big">{presenting}</h1>
                </div> :
                view === 'GetProblem' ?
                <h1 className="big">Voici le problème que tu dois résoudre</h1> :
                view === 'EndPresentation' ?
                <h1 className="big">Superbe présentation {presenting} !</h1> :
                <h1 className="big">à vous de jouer</h1>}
            </Box>
        </div>
    )
}