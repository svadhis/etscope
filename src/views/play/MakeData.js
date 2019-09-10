import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { TextField, Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [socket, playerName, players, step, dataPart, played] = useSelector(state => [state.socket, state.playerName, state.room.players, state.problemDefault, state.room.step, state.dataPart, state.played])
    const dispatch = useDispatch()

    let data = {}

    let self = {}
    players.forEach(player => {
        if (player.name === playerName ) {
            self = player
        }
    })

    let problem = self.problem

    const renderData = () => {
        let title = dataPart === 'name' ? 'Nom de votre solution' : 'Slogan'

        return (
            <div>
                <h3>{title}</h3>
                <TextField id={dataPart} variant="outlined" placeholder="" disabled={played}/>
            </div>
        )
    }

    const sendData = () => {
        let input = document.querySelector('input')

        data = {
            step: 'data',
            value: {
                [dataPart]: input.value
            }
        }

        if (dataPart === 'name') {
            dispatch(setState('dataPart', 'catch'))
        }
        else {
            input.value = data.value

            dispatch(setState('played', true))
            socket.emit('send-data', data)
        }
       
    }

    useEffect(() => {
        navigator.vibrate(Array(9).fill(50))
        dispatch(setState('played', false))
    }, [])

    useEffect(() => {
        if (step === 'end') {
            sendData()
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