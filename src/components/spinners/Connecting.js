import React from 'react'
import { useEffect } from 'react'
import snabbt from 'snabbt.js'
import './Spinners.css'

export default () => {

    useEffect(() => {
        let element = document.querySelector('.lds-container')
        snabbt(element, {
            fromOpacity: 0,
            opacity: 0.9,
            duration: 300
        })
    }, [])

    return (
        <div className="lds-container">
            <h5>CONNEXION AU SERVEUR</h5>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
