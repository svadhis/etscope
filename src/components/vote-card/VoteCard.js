import React from 'react'
import './VoteCard.scss'
import { Box } from '@material-ui/core'
import CanvasDraw from 'react-canvas-draw'

export default props => (
    <div id={'vote-container-' + props.player}>
    <Box id={'vote-card-' + props.player} className="vote-card" width="40vw" height="7vw" minHeight="75px" display="flex" justifyContent="flex-start" alignItems="center">
      <div className="player-picture">
        <CanvasDraw
            hideGrid={true}
            canvasWidth={window.innerWidth * 0.065}
            canvasHeight={window.innerWidth * 0.065}
            disabled={true}
            saveData={props.drawing}
            immediateLoading={true}
        />
      </div>
      <div className="vote-card-data">
        <h1>{props.name}</h1>
        <h3>{props.catch}</h3>
      </div>
    </Box>
  </div>
)