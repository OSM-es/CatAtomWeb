/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useErrorStore } from '@/stores/error'
import { toast } from 'bulma-toast'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('bulma-toast', () => require('../../mocks/bulma-toast'))

let error

beforeEach(() => {
  setActivePinia(createPinia())
  error = useErrorStore()
  error.error = 'error'
})

describe('message getter', () => {
  test('is string with i18n', () => {
    expect(error.message).toBe('ERROR')
  })

  test('is string', () => {
    error.error = 'not.exists'
    expect(error.message).toBe('not.exists')
  })

  test('is in message', () => {
    error.error = { message: 'hola' }
    expect(error.message).toBe('HOLA')
  })

  test('is in response', () => {
    error.error = { response: { data: { message: 'hola' } } }
    expect(error.message).toBe('HOLA')
  })
})

test('clear action', () => {
  error.clear()
  expect(error.error).toBeNull()
})

test('set action', () => {
  error.set('foobar')
  expect(toast.mock.calls[0][0].message).toBe('FOOBAR')
})
