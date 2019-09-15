import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import '../src/App.scss'

import { Button, TextField, Box, LinearProgress } from '@material-ui/core'
import { Replay } from '@material-ui/icons'

import CanvasDraw from 'react-canvas-draw'

const myButton = (type = 'default', value = 'BUTTON', size = 'large') => (
  <button className={type + '-button'}>
    {value}
  </button>
)

const myColorButton = (value = 'red') => (
  <button className="color-button">
    {value === 'undo' ?
    <Replay className="undo" /> :
    <div class={value}></div>}
  </button>
)

const myInput = (type = 'default', value = 'INPUT') => (
  <Box className={type + '-input'} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
    <input type="text" id="" placeholder={value} />
    <div className="line"></div>
  </Box>
  
)

const myTitle = (size = 'big') => (
  <h1 className={'mytitle ' + size}>
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
)

const myPlayerCard = (player, picture, even = '') => (
  <div className={'player-card ' + even}>
    <div className="player-picture">
      <img src="https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/master/pass/trumpshutdownraises.jpg" />
    </div>
    <h3>{player}</h3>
  </div>
)

const myVoteCard = (id, player, drawing, title, slogan) => (
  <div id={'vote-container-' + id}>
    <Box id={'vote-card-' + id} className="vote-card" width="40vw" height="90px" display="flex" justifyContent="flex-start" alignItems="center">
      <div className="player-picture">
        <img src="https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/master/pass/trumpshutdownraises.jpg" />
      </div>
      <div className="vote-card-data">
        <h1>le lavomatic 3000</h1>
        <h3>pour laver sa voiture sans s'en foutre sur la bite !</h3>
      </div>
    </Box>
    <h4 className="vote-player-name">{player}</h4>
  </div>
)



storiesOf('Elements', module)

  .add('button', () => myButton())

  .add('bouton couleurs du pinceau', () => myColorButton())

  .add('input', () => myInput())

  .add('input jeu', () => 
    <Button>Default</Button>
  )

storiesOf('Composants', module)

  .add('carte joueur', () => myPlayerCard('joueur'))

  .add('carte vote', () => myVoteCard())

storiesOf('Vues', module)

  .add('Home', () => 
  <div className="home owner-screen">
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <div>
        {myTitle('very-big')}
        {myButton('home', 'NOUVELLE PARTIE')}
      </div>   
    </Box>
  </div>
  )

  .add('Home Player', () => 
  <div className="home player-screen">
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        {myTitle('big')}
        <div className="player-join">
          <div>
            {myInput('home', 'NOM')}
          </div> 
          <div>
            {myInput('home', 'ROOM')}
          </div>
        </div>
        {myButton('homeplayer', 'REJOINDRE')}
    </Box>
  </div>
  )

  .add('Lobby', () => 
    <div className="owner-screen">
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly">
        <h1>génération d'intelligences artificielles ...</h1>
        <Box className="lobby-player-list" display="flex" flexWrap="wrap" justifyContent="space-evenly">
            {myPlayerCard('luc')}
            {myPlayerCard('svadhisthana', null, 'even-player')}
            {myPlayerCard('joueur 3')}
            {myPlayerCard('joueur 4', null, 'even-player')}
            {myPlayerCard('joueur 5')}
            {myPlayerCard('joueur 6', null, 'even-player')}
        </Box>
      </Box>
    </div>
  )

  .add('Lobby Player', () => 
    <div className="player-screen">
      
    </div>
  )

  .add('Talking', () => 
    <div className="owner-screen">

    </div>
  )

  .add('Idle', () => 
    <div className="player-screen">

    </div>
  )

  .add('Timer', () => 
    <div className="owner-screen">
      <LinearProgress variant="determinate" value="40" />
      <Box height="80vh" display="flex" justifyContent="center" alignItems="center">
        <h1 className="big">tic tac tic tac</h1>
      </Box>
    </div>
  )
  
  .add('MakeProblems', () => 
    <div className="player-screen">

    </div>
  )

  .add('MakeDrawing', () =>
  <div className="drawing player-screen">
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
      <h3>J'AIME PAS MANGER DU CACA</h3>
      <div className="player-canvas">
        <CanvasDraw 
            lazyRadius={2}
            brushRadius={4}
            brushColor="#333"
            hideGrid={true}
            catenaryColor="transparent"
            canvasWidth={window.innerWidth * 0.9}
            canvasHeight={window.innerWidth * 0.9}
        />
      </div>
      <Box width="100vw" display="flex" justifyContent="space-evenly">
        {myColorButton('undo')}
        {myColorButton('default')}
        {myColorButton('red')}
        {myColorButton('blue')}
        {myColorButton('green')}
        {myColorButton('yellow')}
      </Box>
      
      {myButton('default', 'VALIDER')}
    </Box>
  </div>
  )

  .add('MakeData', () => 
    <div className="player-screen">

    </div>
  )

  .add('StartPresentation', () => 
    <div className="player-screen">

    </div>
  )

  .add('MakePresentation', () => 
    <div className="player-screen">

    </div>
  )

  .add('MakeVote', () => 
    <div className="player-screen">

    </div>
  )

  .add('Votes', () => 
    <div className="owner-screen">
      <Box width="100vw" height="80vh" display="flex" flexWrap="wrap" justifyContent="space-evenly" alignItems="center">
        {myVoteCard(1, 'joueur')}
        {myVoteCard(2, 'joueur')}
        {myVoteCard(3, 'joueur')}
        {myVoteCard(4, 'joueur')}
        {myVoteCard(5, 'joueur')}
        {myVoteCard(6, 'joueur')}
        {myVoteCard(7, 'joueur')}
        {myVoteCard(8, 'joueur')}
      </Box>
    </div>
  )

  .add('Results', () => 
    <div className="owner-screen">

    </div>
  )