class MockChat {
  events = []

  on(eventName, listener) {
    this.events[eventName] = listener
  }

  emit(eventName, ...args) {
    this.events[eventName](...args)
  }
}
const chat = new MockChat()

module.exports = {
  useChatService: () => chat,
}
