import { views } from '../mapper/views'

export const useView = (view, suffix) => {
    return views[view + suffix] || views['Home' + suffix]
}

export const useSendOrder = order => {
    return global.socket.emit('order', order)
  }