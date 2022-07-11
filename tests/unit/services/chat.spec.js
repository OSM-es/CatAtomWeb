/* eslint-disable no-undef */
import { io } from 'socket.io-client'
import { setActivePinia, createPinia } from 'pinia'
import { useChatService } from '@/services/chat'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))
jest.mock('socket.io-client', () => require('../../mocks/io'))

let chat

beforeEach(() => {
  setActivePinia(createPinia())
  chat = useChatService()
})

test('constructor', () => {
  expect(chat.socket.on).toBeCalledTimes(3)
  expect(chat.socket.on.mock.calls[0][0]).toBe('join')
  chat.socket.on.mock.calls[0][1]({ participants: 3 })
  expect(chat.job.participantes).toBe(3)
  expect(chat.job.charla.length).toBe(1)

  expect(chat.socket.on.mock.calls[1][0]).toBe('leave')
  chat.socket.on.mock.calls[1][1]({ participants: 2 })
  expect(chat.job.participantes).toBe(2)
  expect(chat.job.charla.length).toBe(2)

  expect(chat.socket.on.mock.calls[2][0]).toBe('chat')
  chat.socket.on.mock.calls[2][1]('lorem ipsum')
  expect(chat.job.charla.length).toBe(3)

  const query = {
    username: 'Cervantes',
    osm_id: '123',
  }
  expect(io).toBeCalledWith(process.env.VUE_APP_ROOT_SOCKETIO, { query })
})

test('sendMessage', () => {
  chat.sendMessage('foobar')
  const data = {
    username: 'Cervantes',
    osmId: '123',
    message: 'foobar',
    room: '12345',
  }
  expect(chat.socket.emit).toBeCalledWith('chat', data)
})
