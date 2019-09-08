import Home from '../views/home/Home'
import Lobby from '../views/lobby/Lobby'
import Talking from '../views/talking/Talking'
import Timer from '../views/timer/Timer'

import HomePlayer from '../views/home/HomePlayer'
import LobbyPlayer from '../views/lobby/LobbyPlayer'
import Idle from '../views/idle/Idle'
import Play from '../views/play/Play'

export default {
    Home:               [Home, HomePlayer],
    Lobby:              [Lobby, LobbyPlayer],
    CreatingStep:       [Talking, Idle],
    MakeProblems:       [Timer, Play, {step: 'problems'}],
    /* StartDrawing:       [Talking, Idle, {step: 'drawing'}],
    MakeDrawing:        [Timer, Play, {step: 'drawing'}],
    StartData:          [Talking, Idle, {step: 'data'}],
    MakeData:           [Timer, Play, {step: 'data'}],
    PresentingStep:     [Talking, Idle, {step: 'presenting-step'}],
    StartPresentation:  [CallPlayer, ReadyUp],
    MakePresentation:   [Presentation, Play, {step: 'presentation'}],
    EndPresentation:    [Talking, Idle, {step: 'presentation'}],
    VotingStep:         [Talking, Idle, {step: 'voting-step'}],
    MakeVotes:          [Votes, Play, {step: 'votes'}],
    Results:            [Results, Idle],
    End:                [End, EndPlayer] */
}

