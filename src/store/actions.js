export const updateRoomState = payload => {
    return {
        type: 'UPDATE_ROOM_STATE',
        room: payload.room,
        player: payload.data
    }
}

export const setState = (state, value) => {
    return {
        type: 'SET',
        state: state,
        value: value
    }
}

export const addToState = (state, value) => {
    return {
        type: 'ADD',
        state: state,
        value: value
    }
}

export const toggleState = state => {
    return {
        type: 'TOGGLE',
        state: state
    }
}

export const updateGameData = data => {
    return {
        type: 'UPDATE_GAME_DATA',
        data: data
    }
}

export const isConnected = bool => {
    return {
        type: 'IS_CONNECTED',
        connected: bool
    }
}

export const isOwner = bool => {
    return {
        type: 'IS_OWNER',
        owner: bool
    }
}

export const isPlayer = (bool, name) => {
    return {
        type: 'IS_PLAYER',
        player: bool,
        name: name
    }
}

export const setTimer = time => {
    return {
        type: 'SET_TIMER',
        time: time
    }
}

export const leaveRoom = () => {
    return {
        type: 'LEAVE_ROOM'
    }
}