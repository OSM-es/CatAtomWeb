/* eslint-disable no-undef */
class ErrorStore {
  error = null

  set(error) {
    this.error = error
  }
}

const error = new ErrorStore()

module.exports = {
  useErrorStore: () => error,
}
