import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import setView from '../../methods/setView'
import { setState, pushToObject, addToState } from '../../store/actions'
import Sound from 'react-sound'

export default props => {
    const [socket, view, loaded, soundPlaying, soundTime] = useSelector(state => [state.socket, state.room.view, state.room.loaded, state.soundPlaying, state.soundTime])
    const dispatch = useDispatch()

    const onLoad = () => {
        dispatch(setState('soundPlaying', 'PLAYING'))
        
    }

    useEffect(() => {
        soundPlaying === 'PLAYING' &&
        socket.emit('loaded', 1)
        setTimeout(() => {
            socket.emit('loaded', 1)
        }, 300)
    }, [view, soundPlaying])

    const playMusic = sound => {
        if (props.owner === 1) {
            return (
                <Sound
                  url={'music/' + sound + '.mp3'}
                  playStatus={Sound.status[soundPlaying]}
                  position={soundTime[sound] || 0}
                  volume={props.type === 'story' ? 100 : 50}
                  onPlaying={(data) => {dispatch(pushToObject('soundTime', sound, data.position))}}
                  onFinishedPlaying={() => {props.type === 'story' && dispatch(addToState('soundStory', 1))}}
                  onLoad={() => onLoad()}
                  autoLoad={true}
                />
            )
        }
    }

    return (
        <div>
            {props.type === 'story' ? playMusic('story' + props.story) : playMusic(setView(view, 'sound'))}
        </div>
    )
}