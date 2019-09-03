import io from "socket.io-client"
import NoSleep from 'nosleep.js'

const initialState = {
	socket: io('http://192.168.1.23:4001'),
	noSleep: new NoSleep(),
	timer: -1,
	gameData: '',
	connected: 1,
	owner: 0,
	player: 0,
	playerName: '',
	room: {
		view: 'Home'
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_ROOM_STATE':
			return {
				...state,
				flash: '',
				room: {
					...state.room,
					...action.room,		
				}
			};
			break

		case 'UPDATE_GAME_DATA':
			return {
				...state,
				gameData: action.data // array
			};
			break

		case 'IS_CONNECTED':
			return {
				...state,
				connected: action.connected
			};
			break

		case 'IS_OWNER':
			return {
				...state,
				owner: action.owner
			};
			break

		case 'IS_PLAYER':
			return {
				...state,
				player: action.player,
				playerName: action.name
			};
			break

		case 'SET_TIMER' :
			return {
				...state,
				timer: action.time
			}
			break

		case 'LEAVE_ROOM':
			return {
				...state,
				room: {
					view: 'Home'
				}
			}
			break

		default:
			return state
			break
	}
}