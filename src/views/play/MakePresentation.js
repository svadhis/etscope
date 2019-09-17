import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import CanvasDraw from 'react-canvas-draw'
import './Play.css'
import Button from '../../components/button/Button';
import { HourglassEmpty } from '@material-ui/icons';

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
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" alignItems="center">
                        {!presentation.steps[2] &&
                        <Button
                            id="drawing"
                            type="card"
                            value={
                                <Box display="flex" justifyContent="center">
                                    <CanvasDraw 
                                        hideGrid={true}
                                        canvasWidth={Math.round(window.innerWidth * 0.3)}
                                        canvasHeight={Math.round(window.innerWidth * 0.3)}
                                        disabled={true}
                                        saveData={presentation.drawing}
                                        immediateLoading={true}
                                    />
                                </Box>
                            }
                            onClick={sendData}
                            data="2"
                        />}
                        {!presentation.steps[0] &&
                        <Button
                            id="name"
                            type="card-name"
                            value={presentation.data.name}
                            onClick={sendData}
                            data="0"
                        />}
                        {!presentation.steps[1] &&
                        <Button
                            id="catch"
                            type="card-slogan"
                            value={presentation.data.catch}
                            onClick={sendData}
                            data="1"
                        />}
                        <Button
                            id="end"
                            type="card"
                            value="terminer"
                            onClick={sendData}
                            data="end"
                        />
                    </Box>
                </div>
            )
        }
        else {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <HourglassEmpty />
                    </Box>
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