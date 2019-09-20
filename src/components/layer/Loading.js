import React from 'react'
import { useEffect } from 'react'
import snabbt from 'snabbt.js'
import './Layer.scss'

export default () => {

    useEffect(() => {
        let element = document.querySelector('.loading-container')
        snabbt(element, {
            fromOpacity: 0,
            opacity: 0.4,
            duration: 300
        })
    }, [])

    return (
        <div class="loading-container">
            <div id="spinner">
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
                <div class="circle-container">
                    <div class="circle"></div>
                </div>
            </div>
        </div>
    )
}
