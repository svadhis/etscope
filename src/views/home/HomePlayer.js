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
                <div class="form-group mt-5">
                    <label for="name">Nom</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="name" 
                        placeholder="Entrez votre nom" 
                    />
                </div>
                <div class="form-group mt-5">
                    <label for="room">Room</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="room" 
                        placeholder="Entrez l'identifiant de la room"
                    />
                </div>
                <div class="mt-5">
                    <button 
                        onClick={() => { socket.emit('order', joinRoom(
                            document.querySelector('input#room').value,
                            document.querySelector('input#name').value
                        ))}}
                        type="button" 
                        className="btn btn-primary btn-lg btn-block">
                            REJOINDRE LA PARTIE
                    </button>
                </div>
            </div>
        </div>
    )
}