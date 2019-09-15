import React from 'react'
import './ColorButton.scss'
import { Replay } from '@material-ui/icons'

export default props => (
    <button className="color-button" onClick={() => props.onClick(props.color)}>
        {props.value === 'undo' ?
        <Replay className="undo" /> :
        <div class={props.value}></div>}
    </button>
)