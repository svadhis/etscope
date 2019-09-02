import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default () => {
    const state = useSelector(state => state)

    return (
        <div>
            GAME IS ABOUT TO START !!!
        </div>
    )
}