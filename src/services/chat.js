import { io } from "socket.io-client";

class SocketioService {
  socket = null;

  constructor() {
    this.connect(process.env.VUE_APP_ROOT_API);
    console.info(this);
    this.socket.on("message", (data) => {
      console.info("message", data);
    });
  }

  on(eventName, handler) {
    this.socket.on(eventName, handler);
  }

  connect(endpoint) {
    this.socket = io(endpoint);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketio = new SocketioService();

export const useChatService = () => socketio;
