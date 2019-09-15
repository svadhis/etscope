import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [
        socket,
        instructions,
        showIns,
        playerName,
        players,
        problemDefault,
        step,
        played
    ] = useSelector(state => [
        state.socket,
        state.room.instructions,
        state.showIns,
        state.playerName,
        state.room.players,
        state.problemDefault,
        state.room.step,
        state.played
    ])

    const dispatch = useDispatch()

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    let problem = self.problem
    console.log(self)

    const renderProblem = () => {

        if (instructions === showIns === true) {
            return (
                <div>
                    INSTRUCTIONS !!
                </div>
            )
        }
        else {
            let render = problem.phrase.split('**')

            return (
                <div>
                    <div>{render[0]}</div>
                    <TextField id="problem" variant="outlined" placeholder="" disabled={played}/>
                    <div>{render[1]}</div>
                    <Button 
                        id="send"
                        size="large"
                        variant="outlined" 
                        color="primary" 
                        disabled={played}
                        onClick={() => {sendData(1)}}
                    >
                        VALIDER
                    </Button>
                    <Button 
                        id="auto"
                        size="large"
                        variant="outlined" 
                        color="primary" 
                        disabled={played}
                        onClick={() => {sendData(0)}}
                    >
                        RANDOM
                    </Button>
                </div>
            )
        }
    }

    const sendData = bool => {
        let input = document.querySelector('input#problem')

        let data = {
            step: 'problem',
            value: bool ? input.value : problem.default[Math.floor(Math.random() * Math.floor(problem.default.length))]
        }

        input.value = data.value

        dispatch(setState('played', true))
        socket.emit('send-data', data)
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('played', false))

        instructions === showIns === true && setTimeout(() => {
            dispatch(setState('showIns', false))
        }, 3000)
        
        return () => dispatch(setState('showIns', true))
    }, [])

    useEffect(() => {
        if (instructions === false || showIns === false) {
            let input = document.querySelector('input')
            let messageRendu = ''
            let message = problem.default[problemDefault]
            let i = 0
            const int = setInterval(() => {
                messageRendu += message[i]
                input.placeholder = messageRendu
                i++
                if (i == message.length) {
                    clearInterval(int)
                }
            }, 60);
            const newDefault = problem.default[problemDefault + 1] ? problemDefault + 1 : 0
            setTimeout(() => {
                dispatch(setState('problemDefault', newDefault))
            }, 3000)
        }
    }, [problemDefault, showIns])

    useEffect(() => {
        if (step === 'end') {
            if (document.querySelector('input').value === '') {
                sendData(0)
            }
            else {
                sendData(1)
            }
        }
    }, [step])

    return (
        <div className="play">
            {renderProblem()}
        </div>
    )
}