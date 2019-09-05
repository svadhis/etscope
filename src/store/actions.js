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

export const isPlayer = (bool, name) => {
    return {
        type: 'IS_PLAYER',
        player: bool,
        name: name
    }
}