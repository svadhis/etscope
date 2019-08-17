import React, { useEffect } from 'react'
import snabbt from 'snabbt.js'
import { useSelector } from 'react-redux'
import Test from '../../components/Test';
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import  { Breakpoint } from 'react-socks';
import { newRoom, startRoom } from '../../mapper/orders'

export default () => {

    const socket = useSelector(state => state.socket)

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
                    <button onClick={() => { socket.emit('order', newRoom([...Array(4)].map(i => (~~(Math.random() * 26 + 10)).toString(36)).join(""))) }}>
                        NEW ROOM
                    </button>
                    <button onClick={() => { socket.emit('order', startRoom('5d4da689ee88a668f98d2091', { number: '654654' })) }}>
                        START ROOM
                    </button>
                </div>   
            </div>
        </div>
    )
}