import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import '../src/App.css'

import { Button, TextField, Box } from '@material-ui/core';

storiesOf('Elements', module)

  .add('bouton par defaut', () => 
    <Button 
      className="default-button"
      id=""
      size="large"
      variant="outlined" 
      color="default" 
      onClick={() => {}}
    >
      VALIDER
    </Button>
  )

  .add('bouton couleurs du pinceau', () => 
    <Button>Default</Button>
  )

  .add('input defaut', () => 
    <TextField id="name" label="Nom" />
  )

  .add('input jeu', () => 
    <Button>Default</Button>
  )

storiesOf('Composants', module)

  .add('carte joueur vote', () => 
    <Button>Default</Button>
  )

storiesOf('Vues', module)

  .add('Home', () => 
  <div className="Home">
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
    
      <div>
        <h1 className="game-title very-big">
          <span>G</span>
          <span>A</span>
          <span>M</span>
          <span>E</span>
          <span> : </span>
          <span>3</span>
          <span>0</span>
          <span>0</span>
          <span>0</span>
        </h1>
        <Button 
          className="home-button"
          id="send"
          size="large"
          variant="outlined" 
          color="default" 
        >
          NOUVELLE PARTIE
        </Button>
      </div>   
    </Box>
  </div>
  )

  .add('Home Player', () => 
  <div className="HomePlayer">
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <h1 className="game-title big">
          <span>G</span>
          <span>A</span>
          <span>M</span>
          <span>E</span>
          <span> : </span>
          <span>3</span>
          <span>0</span>
          <span>0</span>
          <span>0</span>
        </h1>
        <div className="player-join">
          <div>
            <TextField id="name" label="Nom" />
          </div> 
          <div>
            <TextField id="room" label="Room" />
          </div>
        </div>
        <Button 
          className="default-button"
          id="send"
          size="large"
          variant="outlined" 
          color="default" 
        >
          REJOINDRE
        </Button>
    </Box>
  </div>
  )