export const newRoom = number => (
    {
        type: 'newRoom',
        data: {
            room: {
                number: number,
                players: [],
                view: 'Lobby',
                status: 'opened'
            }
        }
    }
)

export const startRoom = (id, content) => (
    {
        type: 'startRoom',
        data: {
            id: id,
            content: content
        }
    }
)

export const joinRoom = (number, name) => (
    {
        type: 'joinRoom',
        data: {
            number: number,
            room: {
                players: [
                    {
                        name: name
                    }
                ]
            },
            player: {
                name: name,
                address: '192.168.1.20'
            }
        }
    }
)
