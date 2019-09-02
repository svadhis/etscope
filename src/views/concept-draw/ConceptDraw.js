import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import CanvasDraw from 'react-canvas-draw'
import LZ from 'lz-string'

export default () => {
    const state = useSelector(state => state)

    const canvas = useRef(null)

    useEffect(() => {
        setInterval(() => {
            localStorage.setItem('drawing', canvas.current.getSaveData())
        }, 1000)
    }, [])

    return (
        <div>
            <h3>Dessinez votre concept !</h3>
            <CanvasDraw 
                ref={canvas}
                lazyRadius={2}
                brushRadius={6}
                hideGrid={true}
                catenaryColor="transparent"
                canvasWidth="100vw"
                canvasHeight="100vw"
            />
        </div>
    )
}