/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useUserStore } from '@/stores/user'
import api from '@/services/api'
jest.mock('@/services/api', () => require('../../mocks/services/api'))

let user

beforeEach(() => {
  localStorage.clear()
  localStorage.__STORE__['username'] = 'foobar'
  localStorage.__STORE__['osmId'] = '123'
  setActivePinia(createPinia())
  user = useUserStore()
})

test('userData', () => {
  expect(user.userData).toEqual({ osm_id: '123', username: 'foobar' })
})

test('isLogged', () => {
  expect(user.isLogged).toBeFalsy()
})

test('isNotLogged', () => {
  user.token = 'foobar'
  expect(user.isLogged).toBeTruthy()
})

test('login', async () => {
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
  expect(api.defaults.headers.common['Authorization']).toBe('token')
  await user.logout()
  expect(localStorage.__STORE__['token']).toBeUndefined()
  expect(user.token).toBe('')
  expect(api.defaults.headers.common['Authorization']).toBeUndefined()
  expect(user.username).toBe('')
})
