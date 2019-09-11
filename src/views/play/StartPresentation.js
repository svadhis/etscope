import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [
        socket, 
        playerName, 
        step,
        presenting
    ] = useSelector(state => [
        state.socket, 
        state.playerName, 
        state.room.step,
        state.room.presenting
    ])

    const renderStart = () => {
        if (presenting === playerName) {
            return (
                <div>
                    <h3>A toi de présenter ta solution !</h3>
                    <Button 
                        id="start"
                        size="large"
                        variant="outlined" 
                        color="primary" 
                        onClick={() => {sendData()}}
                    >
                        COMMENCER
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>EN ATTENTE</h3>
                </div>
            )
        }
    }

    const sendData = () => {    
        socket.emit('set-view', ['MakePresentation'])
    }

    useEffect(() => {
        presenting === playerName && navigator.vibrate(Array(5).fill(100))
    }, [])

    useEffect(() => {
        if (step === 'end') {
            sendData()
        }
    }, [step])

    return (
        <div className="play">
            {renderStart()}
        </div>
    )
}