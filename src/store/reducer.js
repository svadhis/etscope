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

		// Update room state from server call
		case 'UPDATE_ROOM_STATE':
			return {
				...state,
				flash: '',
				room: {
					...state.room,
					...action.room,		
				}
			}
			break

		// Basic actions to set, add and toggle
		case 'SET': // Set local state
			return {
				...state,
				[action.state]: action.value
			}
			break

		case 'ADD': // Add to int
			return {
				...state,
				[action.state]: state[action.state] + action.value
			}
			break

		case 'TOGGLE': // Toggle boolean
			return {
				...state,
				[action.state]: !state[action.state]
			}
			break

		// Others
		case 'IS_PLAYER':
			return {
				...state,
				player: action.player,
				playerName: action.name
			}
			break

		default:
			return state
			break
	}
}