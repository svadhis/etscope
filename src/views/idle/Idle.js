import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default () => {
    const state = useSelector(state => state)

    return (
        <div>
            IDLE
        </div>
    )
}