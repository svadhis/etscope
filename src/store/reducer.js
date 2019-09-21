import initialState from './initialState'

export default (state = initialState, action) => {
	
	let s = { ...state }

	switch (action.type) {

		// Update room state from server
		case 'UPDATE_ROOM_STATE':	
		
			s.flash = ''
			s.room = { ...s.room, ...action.room }
			break

		// Reset the state to start a new game
		case 'REINIT':	
		
			s = initialState
			break

		// Basic actions to set, add, toggle, push to array and set object's key
		case 'SET':

			s[action.state] = action.value
			break

		case 'ADD':
			
			s[action.state] = s[action.state] + action.value
			break

		case 'TOGGLE':

			s[action.state] = !s[action.state]
			break

		case 'PUSH':

			s[action.state] = [ ...s[action.state], action.value ]
			break

		case 'KEY':

			s[action.state] = { ...s[action.state], [action.key]: action.value }
			break

		// Other actions

		case 'IS_PLAYER':

			s.player = action.player
			s.playerName = action.name.toUpperCase()
			break

	}

	return s
}