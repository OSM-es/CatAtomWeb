import { io } from 'socket.io-client'

class SocketioService {
  socket = null

  constructor() {
    this.connect(process.env.VUE_APP_ROOT_API)
  }

  connect(endpoint) {
    this.socket = io(endpoint)
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

const socketio = new SocketioService()

export const useSocketioService = () => socketio
