import { views } from '../mapper/views'

export const useView = (view, client) => {
    return views[view][client]
}

export const useSendOrder = order => {
    return global.socket.emit('order', order)
  }