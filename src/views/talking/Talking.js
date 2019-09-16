import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Illustration } from '../../mapper/components'

export default () => {

    const [
        socket, 
        view,
        timer, 
        subtitles,
        presentOrder,
        players
    ] = useSelector(state => [
        state.socket, 
        state.room.view, 
        state.timer, 
        state.room.subtitles,
        state.room.presentOrder,
        state.room.players.length
    ])

    const dispatch = useDispatch()

    const talking = {}

    switch (view) {
        case 'CreatingStep':

            timer === 0 && socket.emit('set-view', ['MakeProblem'])
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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

            if (timer === 0) {
                dispatch(setState('timer', -1))
                socket.emit('set-view', ['GetProblem'])
            }
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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

            timer === 0 && socket.emit('set-view', ['MakeDrawing'])
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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

            timer === 0 && socket.emit('set-view', ['MakeData'])
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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

        case 'PresentingStep':

            timer === 0 && socket.emit('set-view', ['StartPresentation'])
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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
                    MAINTENANT ON VA PRESENTER TOUT CA
                </div>     
            }
            break

        case 'EndPresentation':

            if (timer === 0) {
                dispatch(setState('timer', -1))
                presentOrder[0] ? 
                socket.emit('set-view', ['StartPresentation']) :
                socket.emit('set-view', ['VotingStep'])
            }
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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
                    WA COOL PRESENTATION !
                </div>     
            }
            break

        case 'VotingStep':

            timer === 0 && socket.emit('set-view', ['MakeVote'])
            
            talking.time = 5

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
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
                    MAINTENANT ON VA VOTER !!
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
        <div className="owner-screen">
            <Illustration image={talking.image} />
            {subtitles === true && 
            <div className="subtitle">
                {talking.view()}
            </div>}
        </div>
    )
}