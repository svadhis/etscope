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
    ] = useSelector(state => [
        state.socket, 
        state.room.view, 
        state.timer, 
        state.room.subtitles,
        state.room.presentOrder,
    ])

    const dispatch = useDispatch()

    const talking = {view: () => {}}

    switch (view) {
        case 'CreatingStep':

            timer === 0 && socket.emit('set-view', 'MakeProblem')
            
            talking.time = 25

            if (timer > 20) {
                talking.image = '01'
                talking.view = () => <div>Nous sommes entourés de toutes sortes d'objets pratiques qui répondent à nos besoins.</div>
            }

            else if (timer > 15) {
                talking.image = '02'
                talking.view = () => <div>Beaucoup proviennent de Corp 3000, une entreprise florissante qui propose des solutions innovantes dans toute la Galaxie.</div>
            }
            
            else if (timer > 10) {
                talking.image = '03'
                talking.view = () => <div>Qui ne possède pas chez lui l'incroyable BalaiPoulpe 3000 ?</div>
            }
            
            else if (timer > 5) {
                talking.image = '04'
                talking.view = () => <div>Mais savez-vous comment sont conçus ces produits utiles à la vie de tous les jours ?</div>
            }
            
            else if (timer > 0) {
                talking.image = '05'
                talking.view = () => <div>Tout commence au département de recensement, qui se charge d'identifier les problèmes auxquels nous faisons face au quotidien.</div>
            }
    
            break

        case 'StartDrawing':

            if (timer === 0) {
                dispatch(setState('timer', -1))
                socket.emit('set-view', 'GetProblem')
            }

            talking.time = 5

            if (timer > 0) {
                talking.image = '06'
                talking.view = () => <div>On confie alors ces problèmes à l'équipe des ingénieurs, qui mettent au point des solutions efficaces.</div>
            }
            
            break

        case 'GetProblem':

            timer === 0 && socket.emit('set-view', 'MakeDrawing')
            
            talking.time = 5

            if (timer > 0) {
                talking.image = '00'
                talking.view = () => <div>Voici le problème que tu dois résoudre</div>
            }

            break

        case 'StartData':

            timer === 0 && socket.emit('set-view', 'MakeData')
            
            talking.time = 5

            if (timer > 0) {
                talking.image = '07'
                talking.view = () => <div>Une fois les objets conçus, c'est au département marketing d'entrer en action pour assurer la réussite commerciale de ces produits.</div>
            }

            break

        case 'PresentingStep':

            timer === 0 && socket.emit('set-view', 'StartPresentation')

            talking.time = 5
            
            if (timer > 0) {
                talking.image = '08'
                talking.view = () => <div>Les projets ainsi terminés sont alors présentés devant le comité de l'entreprise.</div>
            }      

            break

        case 'EndPresentation':

            if (timer === 0) {
                dispatch(setState('timer', -1))
                presentOrder[0] ? 
                socket.emit('set-view', 'StartPresentation') :
                socket.emit('set-view', 'VotingStep')
            }
            
            talking.time = 5
            
            if (timer > 0) {
                talking.image = '00'
                talking.view = () => <div>Superbe présentation !</div>
            }      

            break

        case 'VotingStep':

            timer === 0 && socket.emit('set-view', 'MakeVote')
            
            talking.time = 5
            
            if (timer > 0) {
                talking.image = '09'
                talking.view = () => <div>Enfin, le comité procède à un vote pour sélectionner le meilleur produit à mettre sur le marché.</div>
            }      

            break

        case 'Conclusion':

            if (timer === 0) {
                dispatch(setState('timer', -1))
                socket.emit('set-view', 'Credits')
            }
            
            talking.time = 5
            
            if (timer > 0) {
                talking.image = '10'
                talking.view = () => <div>Le produit sera très vite fabriqué dans les usines perfectionnées de Corp 3000, et se retrouvera bientôt chez votre marchand habituel !</div>
            }      

            break

    }

    useEffect(() => {
        dispatch(setState('timer', 50))   
    }, [])

    useEffect(() => {
        let time = timer === 50 ? talking.time : timer - 1
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