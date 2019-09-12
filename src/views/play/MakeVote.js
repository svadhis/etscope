import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState, addToState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [
        socket, 
        playerName, 
        players, 
        step,  
        played,
        solutions,
        money,
        investment
    ] = useSelector(state => [
        state.socket, 
        state.playerName, 
        state.room.players, 
        state.room.step,  
        state.played,
        state.room.solutions,
        state.money,
        state.investment
    ])
    
    const dispatch = useDispatch()

    const renderVote = () => {
        return (
            <div>
                {players.map(player => player.name !== playerName &&
                    <div onClick={() => {sendData(player.name)}}>
                        {investment[player.name]}
                        <h4>{player.name}</h4>
                        <h3>{solutions[player.name].data.name}</h3>
                    </div>
                )}
                {money}
                
            </div>
        )
    }

    const sendData = target => {  
        if (money > 0) {
            if (target === 'end') {
                dispatch(setState('money', 0))
            }
            else {
                dispatch(addToState('money', -1))
                dispatch(setState('investment', {...investment, [target]: investment[target] + money || money}))
            }  
        }   
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('money', players.length - 1))
        dispatch(setState('played', false))
    }, [])

    useEffect(() => {
        if (money === 0) {
            const data = {
                step: 'vote',
                value: investment
            }
    
            dispatch(setState('played', true))
            socket.emit('send-data', data)
        }
    }, [money])

    useEffect(() => {
        if (step === 'end') {
            sendData('end')
        }
    }, [step])

    return (
        <div className="play">
            {renderVote()}
        </div>
    )
}