import views from '../mapper/views'

export const useView = (view, client) => {
    const index = client === 'player' ? 1 : 0
    return views[view][index]
}

export const useSendOrder = order => {
    return global.socket.emit('order', order)
  }