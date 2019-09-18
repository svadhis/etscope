import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState, addToState } from '../../store/actions'
import { Box } from '@material-ui/core'
import './Play.scss'
import Button from '../../components/button/Button';

export default () => {

    const [
        socket, 
        instructions,
        showIns,
        playerName, 
        players, 
        step,  
        played,
        solutions,
        money,
        investment
    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.showIns,
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
        if (instructions === showIns === true) {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h2>Vote pour les projets que tu préfères, en commençant par celui qui te plaît le plus.</h2>
                        <h2>À toi de choisir si c'est le plus convaincant, le plus créatif ou le plus fun ! </h2>
                    </Box>
                </div>
            )
        }
        else {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h3>ordre de préférence</h3>
                        {players.map((player, i) => player.name !== playerName &&
                        <Button
                            id={'player-' + i}
                            type="card-slogan"
                            value={solutions[player.name].data.name}
                            onClick={sendData}
                            data={player.name}
                        />
                        )}
                    </Box>
                </div>
            )
        }
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
        dispatch(setState('money', players.length <= 3 ? 2 : 3))
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
            if (money === 0) {
                const data = {
                    step: 'vote',
                    value: investment
                }
        
                dispatch(setState('played', true))
                socket.emit('send-data', data)
            }
        }
    }, [money, showIns])

    useEffect(() => {
        if (step === 'end' && played === false) {
            sendData('end')
        }
    }, [step])

    return (
        <div className="play">
            {renderVote()}
        </div>
    )
}