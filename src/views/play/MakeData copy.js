import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [socket, playerName, players, step, dataPart, gameData, played] = useSelector(state => [state.socket, state.playerName, state.room.players, state.room.step, state.dataPart, state.gameData, state.played])
    const dispatch = useDispatch()

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    const renderData = () => {
        let title = dataPart === 'name' ? 'Nom de votre solution' : 'Slogan'

        return (
            <div>
                <h3>{title}</h3>
                <TextField id={dataPart} variant="outlined" placeholder="" disabled={played}/>
            </div>
        )
    }

    const sendData = bool => {   
        let input = document.querySelector('input')

        if (dataPart === 'name') {
            dispatch(setState('gameData', { ...gameData, value: { ...gameData.value, [dataPart]: input.value }}))
            dispatch(setState('dataPart', 'catch'))
        }
        else if (dataPart === 'catch' || bool === 1) {
            dispatch(setState('played', true))
            socket.emit('send-data', gameData)
        }
       
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('played', false))
    }, [])

    useEffect(() => {
        let input = document.querySelector('input')
        input.value = ''
        input.focus()
    }, [dataPart])

    useEffect(() => {
        if (step === 'end') {
            sendData(1)
        }
    }, [step])

    return (
        <div className="play">
            {renderData()}
            <Button 
                id="send"
                size="large"
                variant="outlined" 
                color="primary" 
                disabled={played}
                onClick={() => {sendData()}}
            >
                VALIDER
            </Button>
        </div>
    )
}