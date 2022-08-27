/* eslint-disable no-undef */
import api from '@/services/api'
import { useFlashStore } from '@/stores/flash'
jest.mock('@/stores/flash', () => require('../../mocks/stores/flash'))

test('create', () => {
  expect(api.defaults.baseURL).toBe(process.env.VUE_APP_ROOT_API)
})

test('setAuth', () => {
  expect(localStorage.__STORE__['token']).not.toBe('foobar')
  expect(api.defaults.headers.common['Authorization']).not.toBe('token foobar')
  localStorage.__STORE__['token'] = 'foobar'
  api.setAuth()
  expect(api.defaults.headers.common['Authorization']).toBe('token foobar')
})

test('interceptors', () => {
  const rejected = api.interceptors.response.handlers[0].rejected
  expect(rejected('foobar')).rejects.toEqual('foobar')
  expect(useFlashStore().flash).toBe('foobar')
})
