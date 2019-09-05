import { views } from '../mapper/views'

export const useView = (view, client) => {
    const index = client === 'player' ? 1 : 0
    return { view: views[view][index][0], props: views[view][index][1] }
}

export const useSendOrder = order => {
    return global.socket.emit('order', order)
  }