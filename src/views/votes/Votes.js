import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { setState, addToState } from '../../store/actions'
import { TextField, Button, Box } from '@material-ui/core'
import { VoteCard } from '../../mapper/components'

export default () => {

    const [
        socket,  
        timer,
        players, 
        step,  
        solutions
    ] = useSelector(state => [
        state.socket, 
        state.timer,
        state.room.players, 
        state.room.step,  
        state.room.solutions
    ])
    
    const dispatch = useDispatch()

    const showVotes = () => {
        return (
            <div className="owner-screen">
                <LinearProgress variant="determinate" value={timer} />
                <Box width="100vw" height="80vh" display="flex" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
                {players.map(player =>
                    <VoteCard 
                        player={player.name}
                        name={solutions[player.name].data.name}
                        catch={solutions[player.name].data.catch}
                        drawing={solutions[player.name].drawing}
                    />
                )}
                </Box>
            </div>
        )
    }

    useEffect(() => {
        dispatch(setState('timer', 0))   
    }, [])
            
    useEffect(() => {
        if (timer >= 100) {
            socket.emit('end-step')
        } 

        let timeout = setTimeout(() => {  
            dispatch(setState('timer', timer + 0.2))
        }, 100)
        return () => {
            clearTimeout(timeout)
        }
    }, [timer, step])

    return (
        <div>
            {showVotes()}
        </div>
    )
}