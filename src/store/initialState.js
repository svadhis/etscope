import io from "socket.io-client"
import NoSleep from "nosleep.js"

export default {
	socket: io('https://server-3000.herokuapp.com'),
	noSleep: new NoSleep(),
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
	room: { view: 'Home' }
}