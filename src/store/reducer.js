import initialState from './initialState'

export default (state = initialState, action) => {
	
	let s = { ...state }

	switch (action.type) {

		// Update room state from server call
		case 'UPDATE_ROOM_STATE':	
		
			s.flash = ''
			s.room = { ...s.room, ...action.room }
			break

		// Update room state from server call
		case 'REINIT':	
		
			s = initialState
			break

		// Basic actions to set, add and toggle
		case 'SET': // Set local state

			s[action.state] = action.value
			break

		case 'ADD': // Add to int
			
			s[action.state] = s[action.state] + action.value
			break

		case 'TOGGLE': // Toggle boolean

			s[action.state] = !s[action.state]
			break

		case 'PUSH': // Push to array

			s[action.state] = [ ...s[action.state], action.value ]
			break

		case 'KEY': // Add key into object

			s[action.state] = { ...s[action.state], [action.key]: action.value }
			break

		// Others
		case 'IS_PLAYER':

			s.player = action.player
			s.playerName = action.name
			break

	}

	return s
}