import io from "socket.io-client"
import NoSleep from "nosleep.js"

import server from '../server'

export default {
	socket: io(server),
	noSleep: new NoSleep(),
	exit: false,
	timer: -1,
	showIns: true,
	problemDefault: 0,
	placeholder: '',
	played: false,
	brush: '#444',
	gameData: {},
	dataPart: 'start',
	connected: 1,
	owner: 0,
	player: 0,
	playerName: '',
	money: -1,
	investment: {},
	drawing: '',
	soundPlaying: 'STOPPED',
	soundTime: {},
	room: { view: 'Home' }
}