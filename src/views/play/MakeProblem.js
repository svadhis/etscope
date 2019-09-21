import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box } from '@material-ui/core'

import { setState } from '../../store/actions'
import { Input, Button } from '../../mapper/components'

import './Play.scss'

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

    let problem = ''
    players.forEach(player => {
        if (player.name === playerName ) {
            problem = player.problem
        }
    })

    const renderProblem = () => {

        if (instructions === showIns === true) {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h2>Définis un problème auquel on peut être confronté, ou choisis-en un parmi ceux recensés.</h2>
                        <h2>N'hésite pas à te montrer imaginatif ! </h2>
                    </Box>
                </div>
            )
        }
        else {
            let render = problem.phrase.split('**')

            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <Box height="160px" display="flex" flexDirection="column" justifyContent="space-evenly">
                            <div>{render[0]}</div>
                                <Input type="playing" disabled={played}  onKeyPress={sendData} data="1"/>
                            <div>{render[1]}</div>
                        </Box>
                        <div>
                            <Button 
                                type="default" 
                                id="send"
                                onClick={sendData}
                                data="1"
                                disabled={played}
                                value="valider"
                            />
                            <Button 
                                type="default" 
                                id="auto"
                                onClick={sendData}
                                data="0"
                                disabled={played}
                                value="aléatoire"
                            />
                        </div>
                    </Box>
                </div>
            )
        }
    }

    const sendData = bool => {
        let input = document.querySelector('input')

        let data = {
            step: 'problem',
            value: bool === '1' ? input.value : problem.default[Math.floor(Math.random() * Math.floor(problem.default.length))]
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
        }, 6000)
        
        return () => {
            dispatch(setState('played', false))
            dispatch(setState('showIns', true))
        }
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
        if (step === 'end' && played === false) {
            if (document.querySelector('input').value.length > 0) {
                sendData('1')
            }
            else {
                sendData('0')
            }
        }
    }, [step])

    return (
        <div className="play">
            {renderProblem()}
        </div>
    )
}