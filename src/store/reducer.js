const initialState = {
	room: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'UPDATE_LOCAL_STATE':
			console.log(action.roomState)
			return {
				...state,
				room: {
					...state.room,
					...action.roomState,		
				}
			};
			break
	
		default:
			return state
			break
	}
}