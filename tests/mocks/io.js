/* eslint-disable no-undef */
module.exports = {
  io: jest.fn(() => ({
    on: jest.fn(),
    emit: jest.fn(),
  })),
}
