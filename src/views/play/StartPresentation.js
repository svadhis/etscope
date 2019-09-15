import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Button } from '@material-ui/core'
import './Play.css'

export default () => {

    const [
        socket, 
        instructions,
        showIns,
        playerName, 
        step,
        presenting
    ] = useSelector(state => [
        state.socket, 
        state.room.instructions,
        state.showIns,
        state.playerName, 
        state.room.step,
        state.room.presenting
    ])

    const dispatch = useDispatch()

    const renderStart = () => {
        if (presenting === playerName) {
            if (instructions === showIns === true) {
                return (
                    <div>
                        INSTRUCTIONS !!
                    </div>
                )
            }
            else {
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
        if (presenting === playerName) {
            navigator.vibrate(Array(5).fill(100))

            instructions === showIns === true && setTimeout(() => {
                dispatch(setState('showIns', false))
            }, 3000)
        } 

        return () => dispatch(setState('showIns', true))
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