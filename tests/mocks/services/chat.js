class Chat {
  events = []

  on(eventName, listener) {
    this.events[eventName] = listener
  }

  emit(eventName, ...args) {
    this.events[eventName](...args)
  }
}
const chat = new Chat()

module.exports = {
  useChatService: () => chat,
}
