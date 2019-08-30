export const updateRoomState = payload => {
    return {
        type: 'UPDATE_ROOM_STATE',
        room: payload.room,
        player: payload.data
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

export const leaveRoom = () => {
    return {
        type: 'LEAVE_ROOM'
    }
}

export const saveDrawing = drawing => {
    return {
        type: 'SAVE_DRAWING',
        drawing: drawing
    }
}