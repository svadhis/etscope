import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import CanvasDraw from 'react-canvas-draw'
import './Play.css'

export default () => {

    const [
        socket, 
        playerName, 
        step,
        presenting,
        presentation
    ] = useSelector(state => [
        state.socket, 
        state.playerName, 
        state.room.step,
        state.room.presenting,
        state.room.presentation
    ])

    const renderPresentation = () => {
        if (presenting === playerName) {
            return (
                <div>
                    {!presentation.steps[0] &&
                    <div>
                        <Button 
                            id="name"
                            variant="outlined" 
                            color="primary" 
                            onClick={() => {sendData(0)}}
                        >
                            NOM
                        </Button>
                        <h4>{presentation.data.name}</h4>
                    </div>}
                    {!presentation.steps[1] &&
                    <div>
                        <Button 
                            id="catch"
                            variant="outlined" 
                            color="primary" 
                            onClick={() => {sendData(1)}}
                        >
                            SLOGAN
                        </Button>
                        <h4>{presentation.data.catch}</h4>
                    </div>}
                    {!presentation.steps[2] &&
                    <div>
                        <Button 
                            id="drawing"
                            variant="outlined" 
                            color="primary" 
                            onClick={() => {sendData(2)}}
                        >
                            ILLUSTRATION
                        </Button>
                        <CanvasDraw 
                            hideGrid={true}
                            canvasWidth={Math.round(window.innerWidth * 0.5)}
                            canvasHeight={Math.round(window.innerWidth * 0.5)}
                            disabled={true}
                            saveData={presentation.drawing}
                            immediateLoading={true}
                        />
                    </div>}
                    <Button 
                        id="end"
                        size="large"
                        variant="outlined" 
                        color="primary" 
                        onClick={() => {sendData('end')}}
                    >
                        TERMINER
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

    const sendData = dataPart => {   
        let data = {
            step: 'presentation',
            value: dataPart
        }
        socket.emit('send-data', data)
    }

    useEffect(() => {
        if (step === 'end') {
            sendData('end')
        }
    }, [step])

    return (
        <div className="play">
            {renderPresentation()}
        </div>
    )
}