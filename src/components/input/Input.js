import React from 'react'
import './Input.scss'
import { Box } from '@material-ui/core'

export default props => {

    const handleKeyPress = e => {
        e.key === 'Enter' && props.onKeyPress(props.data)
    }

    return (
        <Box className={props.type + '-input'} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <input type="text" id={props.id} placeholder={props.placeholder} value={props.value} disabled={props.disabled} onChange={props.onChange} onKeyPress={handleKeyPress} />
            <div className="line"></div>
        </Box>
    )
}