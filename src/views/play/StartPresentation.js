import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Box } from '@material-ui/core'
import './Play.css'
import Button from '../../components/button/Button';

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
                return (
                    <div className="player-screen">
                        <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                            <h3>vends ta solution !</h3>
                            <Button
                                id="start"
                                type="default"
                                value="commencer"
                                onClick={sendData}
                            />
                        </Box>
                    </div>
                )
            }
        }
        else {
            return (
                <div className="player-screen">
                    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
                        <h3>c'est bientôt ton tour...</h3>
                    </Box>
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