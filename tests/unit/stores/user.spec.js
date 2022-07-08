/* eslint-disable no-unused-labels */
/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import api from '@/services/api'

jest.mock('@/services/api', () => {
  return {
    defaults: {
      headers: {
        common: {
          Authorization: 'token',
        },
      },
    },
    getAuth: jest.fn((session) => {
      if (session == 'oauth_token=qcu2SF') {
        return Promise.resolve({
          data: {
            session_token: 'nekot',
            username: 'raboof',
            osm_id: '321',
            session: session,
          },
        })
      }
      return Promise.resolve({ data: {} })
    }),
    setAuth: jest.fn(),
  }
})

beforeEach(() => {
  setActivePinia(createPinia())
  localStorage.clear()
  jest.clearAllMocks()
  localStorage.__STORE__['username'] = 'foobar'
  localStorage.__STORE__['osmId'] = '123'
})

test('userData', () => {
  const user = useUserStore()
  expect(user.userData).toEqual({ osm_id: '123', username: 'foobar' })
})

test('isLogged', () => {
  const user = useUserStore()
  expect(user.isLogged).toBeFalsy()
})

test('isNotLogged', () => {
  const user = useUserStore()
  user.token = 'foobar'
  expect(user.isLogged).toBeTruthy()
})

test('login', async () => {
  const user = useUserStore()
  const params = 'oauth_token=qcu2SF'
  await user.login(params)
  expect(api.getAuth).toBeCalledWith(params)
  expect(api.setAuth).toBeCalledWith()
  expect(user.osmId).toBe('321')
  expect(user.username).toBe('raboof')
  expect(user.token).toBe('nekot')
  expect(localStorage.__STORE__['osmId']).toBe('321')
  expect(localStorage.__STORE__['username']).toBe('raboof')
})

test('logout', async () => {
  const user = useUserStore()
  expect(api.defaults.headers.common['Authorization']).toBe('token')
  await user.logout()
  expect(localStorage.__STORE__['token']).toBeUndefined()
  expect(user.token).toBe('')
  expect(api.defaults.headers.common['Authorization']).toBeUndefined()
  expect(user.username).toBe('')
})
