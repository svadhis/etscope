import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFlash } from '../store/actions'

export default () => {
    const flash = useSelector(state => state.flash)
    const dispatch = useDispatch()

    useEffect(() => {
        flash.show &&
        setTimeout(() => {
            dispatch(setFlash({show: 0}))
        }, 2500);
    }, [flash])

    return (
        flash.show ?
        <div className={'fade-in-top alert alert-' + flash.type} role="alert">
            {flash.message}
        </div> : null
    )
}
