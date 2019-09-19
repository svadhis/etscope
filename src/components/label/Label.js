import React from 'react'
import './Label.scss'

export default props => (
    <span 
        className={props.type + '-label'}
        id={props.id}
    >
        {props.value}
    </span>
)