import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { linkTo } from '@storybook/addon-links'
import '../src/App.scss'
import '../src/components/button/Button.scss'

import { Button, TextField, Box, LinearProgress } from '@material-ui/core'
import { Replay, HourglassEmpty } from '@material-ui/icons'

import CanvasDraw from 'react-canvas-draw'

const myButton = (type = 'default', value = 'BUTTON', size = 'large', layer = '1') => (
  <button 
        className={type + '-button'}
    >
        {value}
        {layer && <div className="layer"></div>}
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
    <Box id={'vote-card-' + id} className="vote-card" width="40vw" minHeight="75px" height="7vw" display="flex" justifyContent="flex-start" alignItems="center">
      <div className="player-picture">
        <img src="https://media.vanityfair.com/photos/5c2fdb09ef10e32ca1332862/master/pass/trumpshutdownraises.jpg" />
      </div>
      <div className="vote-card-data">
        <h1>le lavomatic 3000</h1>
        <h3>pour laver sa voiture sans s'en foutre partout !</h3>
      </div>
    </Box>
    <h4 className="vote-player-name">{player}</h4>
  </div>
)

const myIllustration = image => (
  <div className="illustration">
    <img src={image} />
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
        <h1>rejoignez la partie !</h1>
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
       <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly">
        <div>
          <label className="player-label"> INSTRUCTIONS
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
          <label className="player-label"> SOUS TITRES
            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        {myButton('default', 'demarrer')}
        {myButton('default', 'quitter')}
      </Box>
    </div>
  )

  .add('Idle', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <HourglassEmpty />
      </Box>
    </div>
  )

  .add('Idle Get Problem', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <h1 className="big">chaque fois que je mange une salade, je tombe malade.</h1>
      </Box>
    </div>
  )

  .add('Talking', () => 
    <div className="owner-screen">
        {myIllustration("https://www.setaswall.com/wp-content/uploads/2018/05/Space-Planet-2-Wallpaper-800x480.jpg")}
        <div className="subtitle">
          Ideo urbs venerabilis post superbas efferatarum gentium cervices oppressas
          latasque leges fundamenta libertatis et retinacula sempiterna velut frugi paren
          rens et
        </div>
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

  .add('Instructions', () =>
  <div className="player-screen">
    <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <h2>chaque fois que je mange une salade, je tombe malade.</h2>
        <h2>chaque fois que je mange une salade, je tombe malade.</h2>
        <h2>chaque fois que je mange une salade, je tombe malade.</h2>
      </Box>
  </div>
  )
  
  .add('MakeProblems', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
      <Box height="160px" display="flex" flexDirection="column" justifyContent="space-evenly">
          <div>CHAQUE FOIS QUE JE</div>
          {myInput('playing', 'FAIS A MANGER')}
          <div>JE FINIS PAR M'ENDORMIR</div>
        </Box>
        <div>
          {myButton('default', 'VALIDER')}
          {myButton('default', 'RANDOM')}
        </div>
      </Box>
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
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <div>
          <h3>NOM DE VOTRE PRODUIT</h3>
          {myInput('playing2', 'NOM')}
        </div>
        {myButton('default', 'VALIDER')}
      </Box>
    </div>
  )

  .add('StartPresentation', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <h3>A TON TOUR DE PRESENTER</h3>
        {myButton('default', 'COMMENCER')}
      </Box>
    </div>
  )

  .add('MakePresentation', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        {myButton('card-name', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'pour se debarasser facilement des cafards :D sinon cest relou lel')}
        {myButton('card',
          <Box display="flex" justifyContent="center">
              <CanvasDraw 
                  hideGrid={true}
                  canvasWidth={Math.round(window.innerWidth * 0.3)}
                  canvasHeight={Math.round(window.innerWidth * 0.3)}
                  disabled={true}
                  immediateLoading={true}
              />
          </Box>)}   
        {myButton('card', 'TERMINER')}
      </Box>
    </div>
  )

  .add('Presentation', () =>
    <div className="owner-screen">
      <Box height="100vh" display="flex" justifyContent="space-evenly" alignItems="center">
        <Box width="45vw" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
          <h1 className="very-big">BLA BLA BLA</h1>
          <h1>BLA BLA BLABLA BLA BLABLA BLA BLABLA BLA BLABLA BLA BLABLA BLA BLA</h1>
        </Box>
        <CanvasDraw 
            hideGrid={true}
            canvasWidth={Math.round(window.innerWidth * 0.4)}
            canvasHeight={Math.round(window.innerWidth * 0.4)}
            disabled={true}
            immediateLoading={true}
        />
      </Box>
    </div>
  )

  .add('MakeVote', () => 
    <div className="player-screen">
      <Box height="100vh" display="flex" flexDirection="column" justifyContent="space-evenly" alignItems="center">
        <h3>ordre de préférence</h3>
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
        {myButton('card-slogan', 'TERMINATOR 6000')}
      </Box>
    </div>
  )

  .add('Votes', () => 
    <div className="owner-screen">
      <LinearProgress variant="determinate" value="40" />
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