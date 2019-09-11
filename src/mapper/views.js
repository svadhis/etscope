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

export default {
    Home:               [Home, HomePlayer],
    Lobby:              [Lobby, LobbyPlayer],
    CreatingStep:       [Talking, Idle],
    MakeProblem:        [Timer, MakeProblem],
    StartDrawing:       [Talking, Idle],
    GetProblem:         [Talking, Idle],
    MakeDrawing:        [Timer, MakeDrawing],
    StartData:          [Talking, Idle],
    MakeData:           [Timer, MakeData],
    PresentingStep:     [Talking, Idle],
    StartPresentation:  [Timer, StartPresentation],
    MakePresentation:   [Presentation, MakePresentation],
    EndPresentation:    [Talking, Idle],
    VotingStep:         [Talking, Idle],
    MakeVote:           [Votes, MakeVote],
    Results:            [Results, Idle], // set owner to Talking
    // End:                [End, EndPlayer]
}

