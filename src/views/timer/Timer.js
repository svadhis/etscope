import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';
import { setState } from '../../store/actions';

export default () => {
    const [socket, timer, step] = useSelector(state => [state.socket, state.timer, state.room.step])
    const dispatch = useDispatch()

    useEffect(() => {
        if (timer === 100) {
            socket.emit('end-step')
            dispatch(setState('timer', 0))      
        } 
        
        let timeout = setTimeout(() => {  
            dispatch(setState('timer', timer + 1))
        }, 100);
        return () => {
            clearTimeout(timeout)
        };
    }, [timer, step])

    return (
        <div>
            <LinearProgress variant="determinate" value={timer} />
        </div>
    )
}