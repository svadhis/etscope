// Returns the view component and audio corresponding to the room view and client type

import views from '../mapper/views'

export default (view, client) => {
    const index = client === 'sound' ? 2 : client === 'player' ? 1 : 0
    return views[view][index]
}