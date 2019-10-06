import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { setState } from '../../store/actions'
import { Illustration, Sound } from '../../mapper/components'

import './Talking.scss'

export default () => {

    const [
        socket, 
        view,
        subtitles,
        talk,
        owner,
        soundStory,
    ] = useSelector(state => [
        state.socket, 
        state.room.view, 
        state.room.subtitles,
        state.talk,
        state.owner,
        state.soundStory,
    ])

    const dispatch = useDispatch()
    
    useEffect(() => {
        const setTalking = () => {
        
            switch (view) {
                case 'CreatingStep':
    
                    soundStory === 6 && socket.emit('set-view', 'MakeProblem')
        
                    if (soundStory === 1) {
                        return "Nous sommes entourés de toutes sortes d'objets pratiques qui répondent à nos besoins."
                    }
    
                    else if (soundStory === 2) {
                        return 'Beaucoup proviennent de Corp 3000, une entreprise florissante qui propose des solutions innovantes dans toute la Galaxie.'
                    }
    
                    else if (soundStory === 3) {
                        return "Qui ne possède pas chez lui l'incroyable BalaiPoulpe 3000 ?"
                    }
    
                    else if (soundStory === 4) {
                        return 'Mais savez-vous comment sont conçus ces produits utiles à la vie de tous les jours ?'
                    }
    
                    else if (soundStory === 5) {
                        return "Tout commence au département de recensement, qui se charge d'identifier les problèmes auxquels nous faisons face au quotidien."
                    }

                    break
        
                case 'StartDrawing':
        
                    soundStory === 7 &&  socket.emit('set-view', 'GetProblem')
        
                    return "On confie alors ces problèmes à l'équipe des ingénieurs, qui mettent au point des solutions efficaces."
    
                    break
         
                case 'StartData':
        
                    soundStory === 8 &&  socket.emit('set-view', 'MakeData')
        
                    return "Une fois les objets conçus, c'est au département marketing d'entrer en action pour assurer la réussite commerciale de ces produits."
        
                    break
        
                case 'PresentingStep':
        
                    soundStory === 9 &&  socket.emit('set-view', 'StartPresentation')
        
                    return "Les projets ainsi terminés sont alors présentés devant le comité de l'entreprise."      
        
                    break
        
                case 'VotingStep':
        
                    soundStory === 10 &&  socket.emit('set-view', 'MakeVote')
                    
                    return 'Enfin, le comité procède à un vote pour sélectionner le meilleur produit à mettre sur le marché.'
    
                    break
        
                case 'Conclusion':
        
                    soundStory === 11 &&  socket.emit('set-view', 'Credits')
                    
                    return 'Le produit sera très vite fabriqué dans les usines perfectionnées de Corp 3000, et se retrouvera bientôt chez votre marchand habituel !'
        
                    break
    
                default:
    
                    return ''
    
                    break
            }
        }
    
        dispatch(setState('talk', setTalking()))
    }, [soundStory])

    /* useEffect(() => {
        let time = timer === 50 ? talking.time : timer - 1
        let timeout = timer !== 0 && setTimeout(() => {
            dispatch(setState('timer', time))
        }, 1000);
        return () => {
            clearTimeout(timeout)
        };
    }, [timer]) */

/*     useEffect(() => {
        soundPlaying === 'STOPPED' && dispatch(setState('talk', 0))
    }, [soundPlaying]) */

    return (
        <div className="owner-screen">    
            <Illustration image={'0' + soundStory} />
            {soundStory > 0 && <Sound owner={owner} type="story" story={soundStory} />}
            {subtitles === true && talk !== '' &&
            <div className="subtitle">
                <div>{talk}</div>
            </div>}
        </div>
    )
}