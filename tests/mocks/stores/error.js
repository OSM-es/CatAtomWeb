/* eslint-disable no-undef */
class MockErrorStore {
  error = null

  set(error) {
    this.error = error
  }
}

const error = new MockErrorStore()

module.exports = {
  useErrorStore: () => error,
}
