import { io } from "socket.io-client";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";

class SocketioService {
  socket = null;

  constructor() {
    this.connect(process.env.VUE_APP_ROOT_API);

    this.socket.on("join", (data) => {
      const job = useJobStore();
      const msg = `${data.username} se unió a ${data.room}`;
      job.participantes = data.participants;
      job.charla.push(msg);
    });
    this.socket.on("leave", (data) => {
      const job = useJobStore();
      const msg = `${data.username} abandonó ${data.room}`;
      job.participantes = data.participants;
      job.charla.push(msg);
    });
    this.socket.on("chat", (msg) => {
      useJobStore().charla.push(msg);
    });
  }

  on(eventName, handler) {
    this.socket.on(eventName, handler);
  }

  sendMessage(message) {
    const user = useUserStore();
    const data = {
      username: user.username,
      osmId: user.osmId,
      message: message,
      room: useJobStore().cod_municipio,
    };
    this.socket.emit("chat", data);
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
