import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setState } from '../../store/actions'
import { Illustration } from '../../mapper/components'
import './Talking.scss'

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
            
            talking.time = 20

            talking.image = "https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg"

            talking.view = () => {
                return timer > 15 ?
                <div>
                     Nous sommes entourés de toutes sortes d'objets pratiques qui répondent à nos besoins. 
                </div> : timer > 10 ?
                <div>
                    Beaucoup proviennent de Corp 3000, une entreprise florissante qui propose des solutions innovantes dans toute la Galaxie.
                </div> : timer > 5 ?
                <div>
                    Mais savez-vous comment sont conçus ces produits utiles à la vie de tous les jours ?
                </div> : timer > 0 &&
                <div>
                    Tout commence au département de recensement, qui se charge d'identifier les problèmes auxquels nous faisons face au quotidien.
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
                    On confie alors ces problèmes à l'équipe des ingénieurs, qui mettent au point des solutions efficaces.
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
                    Une fois les objets conçus, c'est au département marketing d'entrer en action pour assurer la réussite commerciale de ces produits.
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
                    Les projets ainsi terminés sont alors présentés devant le comité de l'entreprise.
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
                    Superbe présentation !
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
                    Enfin, le commitee procède à un vote pour sélectionner le meilleur produit à mettre sur le marché.
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