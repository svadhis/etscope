import React from 'react'
import './Input.scss'
import { Box } from '@material-ui/core'

export default props => (
    <Box className={props.type + '-input'} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <input type="text" id={props.id} placeholder={props.value} />
        <div className="line"></div>
    </Box>
)