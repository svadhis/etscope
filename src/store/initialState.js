import io from "socket.io-client"
import NoSleep from "nosleep.js"

export default {
	socket: io('https://server-3000.herokuapp.com'),
	// socket: io('localhost:4001'),
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
	room: { view: 'Home' }
}