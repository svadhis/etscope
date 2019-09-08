import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { TextField, Button } from '@material-ui/core';

export default () => {

    const [socket, playerName, players, step] = useSelector(state => [state.socket, state.playerName, state.room.players, state.room.step])

    const renderProblem = () => {
        let problem = players.map(player => player.name === playerName && player.problem)
        let render = problem[0].split('**')

        return (
            <div>
                <div>{render[0]}</div>
                <TextField id="problem" />
                <div>{render[1]}</div>
            </div>
        )
    }

 /*    const setGameData = () => {
        let data = [
            document.querySelector('input#problem-1').value,
            document.querySelector('input#problem-2').value
        ]
        dispatch(updateGameData(data))
    } */

    const sendData = () => {
        let input = document.querySelector('input#problem')
        let button = document.querySelector('button#send')

        let data = {
            step: 'problem',
            value: input.value
        }
        
        input.disabled = true
        button.disabled = true
        button.innerHTML = 'VALIDE'

        socket.emit('send-data', data)
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
    }, [])

    useEffect(() => {
        step === 'end' && sendData()
    }, [step])

    return (
        <div>
            {renderProblem()}
            <Button 
                id="send"
                size="large"
                variant="outlined" 
                color="primary" 
                onClick={() => {sendData()}}
            >
                VALIDER
            </Button>
        </div>
    )
}