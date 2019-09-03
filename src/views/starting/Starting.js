import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTimer } from '../../store/actions'

export default () => {
    const [socket, timer, instructions, players] = useSelector(state => [state.socket, state.timer, state.room.instructions, state.room.players.length])
    const dispatch = useDispatch()

    const howTo = instructions ? 1 : 5

    const startScreen = () => {
        timer === 0 && socket.emit('set-view', ['MakeProblems', players])

        return timer > 15 ?
        <div>
            premieres instructions
        </div> : timer > 10 ?
        <div>
            deuxiemes instructions
        </div> : timer > 5 ?
        <div>
            troisiemes instructions
        </div> : timer > 0 &&
        <div>
            la partie va commencer !
        </div>     
    }

    useEffect(() => {
        let time = timer === -1 ? howTo : timer - 1
        let timeout = timer !== 0 && setTimeout(() => {
            dispatch(setTimer(time))
        }, 1000);
        return () => {
            clearTimeout(timeout)
        };
    }, [timer])

    return (
        <div>
            {timer}
            {startScreen()}
        </div>
    )
}