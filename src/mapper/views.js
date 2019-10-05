// Mapping components and audio files to game views for owner and players
// { VIEW: [OWNER VIEW, PLAYER VIEW, AUDIO] }

import sound from './sounds'

import Home from '../views/home/Home'
import Lobby from '../views/lobby/Lobby'
import Talking from '../views/talking/Talking'
import Timer from '../views/timer/Timer'
import Presentation from '../views/presentation/Presentation'
import Votes from '../views/votes/Votes'
import Results from '../views/results/Results'

import HomePlayer from '../views/home/HomePlayer'
import LobbyPlayer from '../views/lobby/LobbyPlayer'
import Idle from '../views/idle/Idle'
import MakeProblem from '../views/play/MakeProblem'
import MakeDrawing from '../views/play/MakeDrawing'
import MakeData from '../views/play/MakeData'
import StartPresentation from '../views/play/StartPresentation'
import MakePresentation from '../views/play/MakePresentation'
import MakeVote from '../views/play/MakeVote'

const [title, main, timer, presentation] = [sound.title, sound.main, sound.timer, sound.presentation]

export default {
    Home:               [Home, HomePlayer],
    Lobby:              [Lobby, LobbyPlayer, title],
    CreatingStep:       [Talking, Idle, main],
    MakeProblem:        [Timer, MakeProblem, timer],
    StartDrawing:       [Talking, Idle, main],
    GetProblem:         [Talking, Idle, main],
    MakeDrawing:        [Timer, MakeDrawing, timer],
    StartData:          [Talking, Idle, main],
    MakeData:           [Timer, MakeData, timer],
    PresentingStep:     [Talking, Idle, main],
    StartPresentation:  [Timer, StartPresentation, main],
    MakePresentation:   [Presentation, MakePresentation, presentation],
    EndPresentation:    [Talking, Idle, main],
    VotingStep:         [Talking, Idle, main],
    MakeVote:           [Votes, MakeVote, timer],
    Results:            [Results, Idle, title],
    // Conclusion:         [Talking, Idle, title],
    // Credits:            [Credits, Thanks, title]
}

