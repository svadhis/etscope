import Home from '../views/home/Home'
import Lobby from '../views/lobby/Lobby'
import Starting from '../views/starting/Starting'
import Waiting from '../views/waiting/Waiting';

import HomePlayer from '../views/home/HomePlayer'
import LobbyPlayer from '../views/lobby/LobbyPlayer'
import Idle from '../views/idle/Idle'
import MakeProblems from '../views/make-problems/MakeProblems';


export const views = {
    Home:           [Home, HomePlayer],
    Lobby:          [Lobby, LobbyPlayer],
    Starting:       [Starting, Idle],
    MakeProblems:   [Waiting, MakeProblems]
}
