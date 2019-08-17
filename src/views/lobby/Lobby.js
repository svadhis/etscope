import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { isOwner } from '../../store/actions'

export default () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(isOwner(1))
    }, [])

    return (
        <div>
            {console.log(state)}
            LOBBY OWNER
        </div>
    )
}