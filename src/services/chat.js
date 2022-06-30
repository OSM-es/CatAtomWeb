import { io } from "socket.io-client";
import { useJobStore } from "@/stores/job";
import { useUserStore } from "@/stores/user";
import i18n from "@/services/i18n";

const { t } = i18n.global;

class SocketioService {
  socket = null;

  constructor() {
    this.connect(process.env.VUE_APP_ROOT_SOCKETIO);

    this.socket.on("join", (data) => {
      const job = useJobStore();
      job.participantes = data.participants;
      console.info(data);
      console.info(t("locale"));
      console.info(i18n);
      job.charla.push(t("joined", data));
    });
    this.socket.on("leave", (data) => {
      const job = useJobStore();
      job.participantes = data.participants;
      job.charla.push(t("leave", data));
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
