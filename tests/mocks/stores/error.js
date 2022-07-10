/* eslint-disable no-undef */
const errorMock = jest.fn()

module.exports = {
  useErrorStore: () => ({
    set: errorMock,
  }),
}
