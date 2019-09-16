import React from 'react'
import { useEffect } from 'react'
import snabbt from 'snabbt.js'
import './Spinners.scss'

export default () => {

    useEffect(() => {
        let element = document.querySelector('.connecting-container')
        snabbt(element, {
            fromOpacity: 0,
            opacity: 0.4,
            duration: 300
        })
    }, [])

    return (
        <div className="connecting-container">
            <div className="connecting">
            </div>
        </div>
    )
}
