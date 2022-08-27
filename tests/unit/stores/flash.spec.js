/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useFlashStore } from '@/stores/flash'
import { toast } from 'bulma-toast'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('bulma-toast', () => require('../../mocks/bulma-toast'))

let flash

beforeEach(() => {
  setActivePinia(createPinia())
  flash = useFlashStore()
  flash.flash = 'flash'
})

describe('message getter', () => {
  test('is string with i18n', () => {
    expect(flash.message).toBe('FLASH')
  })

  test('is string', () => {
    flash.flash = 'not.exists'
    expect(flash.message).toBe('not.exists')
  })

  test('is in message', () => {
    flash.flash = { message: 'hola' }
    expect(flash.message).toBe('HOLA')
  })

  test('is in response', () => {
    flash.flash = { response: { data: { message: 'hola' } } }
    expect(flash.message).toBe('HOLA')
  })
})

test('clear action', () => {
  flash.clear()
  expect(flash.flash).toBeNull()
})

test('set action', () => {
  flash.set('foobar')
  expect(toast.mock.calls[0][0].message).toBe('FOOBAR')
})
