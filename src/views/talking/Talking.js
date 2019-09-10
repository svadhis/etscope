import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'

export default () => {
    const [socket, view, timer, instructions, players] = useSelector(state => [state.socket, state.room.view, state.timer, state.room.instructions, state.room.players.length])
    const dispatch = useDispatch()

    const talking = {}

    switch (view) {
        case 'CreatingStep':
            
            talking.time = instructions ? 1 : 5

            talking.view = () => {
                timer === 0 && socket.emit('set-view', ['MakeProblem'])

                return timer > 15 ?
                <div>
                    premieres instructions
                </div> : timer > 10 ?
                <div>
                    deuxiemes instructions
                </div> : timer > 5 ?
                <div>
                    troisiemes instructions
                </div> : timer > 0 &&
                <div>
                    la partie va commencer !
                </div>     
            }
            break

        case 'StartDrawing':
            
            talking.time = 3

            talking.view = () => {
                if (timer === 0) {
                    dispatch(setState('timer', -1))
                    socket.emit('set-view', ['GetProblem'])
                }

                return timer > 15 ?
                <div>
                    premieres instructions
                </div> : timer > 10 ?
                <div>
                    deuxiemes instructions
                </div> : timer > 5 ?
                <div>
                    troisiemes instructions
                </div> : timer > 0 &&
                <div>
                    ALLEZ ON DESSINE !!
                </div>     
            }
            break

        case 'GetProblem':
            
            talking.time = 3

            talking.view = () => {
                timer === 0 && socket.emit('set-view', ['MakeDrawing'])

                return timer > 15 ?
                <div>
                    premieres instructions
                </div> : timer > 10 ?
                <div>
                    deuxiemes instructions
                </div> : timer > 5 ?
                <div>
                    troisiemes instructions
                </div> : timer > 0 &&
                <div>
                    VOILA TON PROBLEME !
                </div>     
            }
            break

        case 'StartData':
            
            talking.time = 3

            talking.view = () => {
                timer === 0 && socket.emit('set-view', ['MakeData'])

                return timer > 15 ?
                <div>
                    premieres instructions
                </div> : timer > 10 ?
                <div>
                    deuxiemes instructions
                </div> : timer > 5 ?
                <div>
                    troisiemes instructions
                </div> : timer > 0 &&
                <div>
                    TITRE ET SLOGAN !
                </div>     
            }
            break

    }

    useEffect(() => {
        dispatch(setState('timer', -1))   
    }, [])

    useEffect(() => {
        let time = timer === -1 ? talking.time : timer - 1
        let timeout = timer !== 0 && setTimeout(() => {
            dispatch(setState('timer', time))
        }, 1000);
        return () => {
            clearTimeout(timeout)
        };
    }, [timer])

    return (
        <div>
            {timer}
            {talking.view()}
        </div>
    )
}