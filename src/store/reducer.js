import io from "socket.io-client"

const initialState = {
	socket: io('http://localhost:4001'),
	connected: 1,
	owner: 0,
	player: 0,
	room: {
		view: 'Home'
	},
	flash: {
		show: 0,
		type: '',
		message: ''
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
					...action.roomState,		
				}
			};
			break

		case 'SET_FLASH':
			return {
				...state,
				flash: {
					...state.flash,
					show: action.flash.show,
					type: action.flash.type || state.flash.type,
					message: action.flash.message || state.flash.message
				}
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

		default:
			return state
			break
	}
}