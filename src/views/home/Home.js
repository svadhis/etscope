import React, { useEffect } from 'react'
import snabbt from 'snabbt.js'
import { useSelector } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import  { Breakpoint } from 'react-socks';
import { newRoom, startRoom } from '../../mapper/orders'

export default () => {

    const [socket, noSleep] = useSelector(state => [state.socket, state.noSleep])

    const newRoom = () => {
        noSleep.enable()
        socket.emit('new-room', [...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join(""))
    }

    useEffect(() => {
        let element = document.querySelector('.Home')
        snabbt(element, {
            position: [0, 300, 0]
          });
    }, [])

    return (
        <div>
            <div className="Home">
                <div>
                    <button onClick={() => {newRoom()}}>
                        NEW ROOM
                    </button>
                </div>   
            </div>
        </div>
    )
}