import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core'
import './Play.css'
import { Input, Button } from '../../mapper/components';

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
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h2>Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo</h2>
                        <h2>Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla</h2>
                        <h2>semper ex summorum hominum</h2>
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
        }, 3000)
        
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