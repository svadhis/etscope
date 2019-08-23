export const updateRoomState = state => {
    return {
        type: 'UPDATE_ROOM_STATE',
        roomState: state
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

export const isPlayer = bool => {
    return {
        type: 'IS_PLAYER',
        player: bool
    }
}