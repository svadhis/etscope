import views from '../mapper/views'

export const setView = (view, client) => {
    const index = client === 'sound' ? 2 : client === 'player' ? 1 : 0
    return views[view][index]
}

export const useSendOrder = order => {
    return global.socket.emit('order', order)
  }