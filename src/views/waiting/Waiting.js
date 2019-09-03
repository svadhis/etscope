import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress';
import { setTimer } from '../../store/actions';

export default () => {
    const [socket, timer, step] = useSelector(state => [state.socket, state.timer, state.room.step])
    const dispatch = useDispatch()

    useEffect(() => {
        if (step === 'ended') {
            socket.emit('set-view', ['Home'])
        }

        if (timer === 100) {
            socket.emit('end-step')
            dispatch(setTimer(0))      
        } 
        
        let timeout = setTimeout(() => {  
            dispatch(setTimer(timer + 1))
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