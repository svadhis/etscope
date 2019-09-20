import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setView } from '../../methods/hooks'
import { setState, pushToObject } from '../../store/actions'
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
                  onPlaying={(data) => {dispatch(pushToObject('soundTime', sound, data.position))}}
                  onLoad={() => onLoad()}
                  autoLoad={true}
                />
            )
        }
    }

    return (
        <div>
            {playMusic(setView(view, 'sound'))}
        </div>
    )
}