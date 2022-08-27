import { io } from 'socket.io-client'
import { useJobStore } from '@/stores/job'
import { useUserStore } from '@/stores/user'
import i18n from '@/services/i18n'

const { t } = i18n.global

class SocketioService {
  socket = null
  user = null

  constructor() {
    this.user = useUserStore()
    this.job = useJobStore()
    this.connect(process.env.VUE_APP_ROOT_SOCKETIO)

    this.socket.on('join', (data) => {
      this.job.participantes = data.participants
      this.job.charla.push(t('joined', data))
    })
    this.socket.on('leave', (data) => {
      this.job.participantes = data.participants
      this.job.charla.push(t('leave', data))
    })
    this.socket.on('chat', (msg) => {
      console.info(msg)
      this.job.charla.push(msg)
    })
  }

  on(eventName, handler) {
    this.socket.on(eventName, handler)
  }

  sendMessage(message) {
    const data = {
      username: this.user.username,
      osmId: this.user.osmId,
      message: message,
      room: this.job.cod_municipio,
    }
    this.socket.emit('chat', data)
  }

  connect(endpoint) {
    const username = this.user.username
    const osmId = this.user.osmId
    const userData = { osm_id: osmId, username: username }
    this.socket = io(endpoint, { query: userData })
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }

  emit(msg, data, room) {
    this.socket.emit(msg, data, room)
  }
}

let socketio = false

export const useChatService = () => {
  if (!socketio) {
    socketio = new SocketioService()
  }
  return socketio
}
