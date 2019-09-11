import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { setState } from '../../store/actions'

export default () => {

    const [
        socket, 
        timer, 
        view, 
        step, 
        presenting
    ] = useSelector(state => [
        state.socket, 
        state.timer, 
        state.room.view, 
        state.room.step, 
        state.room.presenting
    ])

    const dispatch = useDispatch()

    let speed = 1

    switch (view) {
        case 'MakeProblem':
            speed = 10
            break

        case 'MakeDrawing':
            speed = 10
            break

        case 'StartPresentation':
            speed = 10
            break

        default:
            speed = 10
            break
    }

    useEffect(() => {
        dispatch(setState('timer', 0))   
    }, [])
            
    useEffect(() => {
        if (timer >= 100) {
            socket.emit('end-step')
        } 

        let timeout = setTimeout(() => {  
            dispatch(setState('timer', timer + (speed / 10)))
        }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [timer, step])

    return (
        <div>
            <LinearProgress variant="determinate" value={timer} />
            {view === 'StartPresentation' &&
            <div>
                <h4>C'est à toi</h4>
                <h3>{ presenting }</h3>
            </div>}
        </div>
    )
}