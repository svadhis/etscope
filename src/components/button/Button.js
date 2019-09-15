import React from 'react'
import './Button.scss'

export default props => (
    <button 
        className={props.type + '-button'}
        id={props.id}
        onClick={props.onClick}
    >
        {props.value}
    </button>
)