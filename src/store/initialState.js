import io from "socket.io-client"
import NoSleep from 'nosleep.js'

export default {
	socket: io('http://192.168.1.20:4001'),
	noSleep: new NoSleep(),
	timer: -1,
	gameData: '',
	connected: 1,
	owner: 0,
	player: 0,
	playerName: '',
	room: { view: 'Home' }
}