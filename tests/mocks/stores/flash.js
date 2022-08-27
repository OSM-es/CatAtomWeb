/* eslint-disable no-undef */
class MockFlashStore {
  flash = null

  set(flash) {
    this.flash = flash
  }
}

const flash = new MockFlashStore()

module.exports = {
  useFlashStore: () => flash,
}
