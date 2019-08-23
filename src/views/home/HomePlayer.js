import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSendOrder } from '../../methods/hooks'
import './Home.css'
import { joinRoom } from '../../mapper/orders'

export default () => {

    const socket = useSelector(state => state.socket)

    return (
        <div>
            <div className="HomePlayer">
                <div className="form-group mt-5">
                    <label htmlFor="name">Nom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Entrez votre nom" 
                    />
                </div>
                <div className="form-group mt-5">
                    <label htmlFor="room">Room</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="room" 
                        placeholder="Entrez l'identifiant de la room"
                    />
                </div>
                <div className="mt-5">
                    <button 
                        onClick={() => { socket.emit('join-room', {
                            room: document.querySelector('input#room').value,
                            player: document.querySelector('input#name').value
                        })}}
                        type="button" 
                        className="btn btn-primary btn-lg btn-block">
                            REJOINDRE LA PARTIE
                    </button>
                </div>
            </div>
        </div>
    )
}