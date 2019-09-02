import io from "socket.io-client"
import NoSleep from 'nosleep.js'

const initialState = {
	socket: io('http://192.168.1.20:4001'),
	noSleep: new NoSleep(),
	drawing: '',
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
				},
				playerName: action.player || state.playerName
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
				player: action.player
			};
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