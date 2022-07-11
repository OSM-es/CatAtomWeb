/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useProvStore } from '@/stores/provincias'
jest.mock('@/services/api', () => require('../../mocks/services/api'))

let provs

beforeEach(() => {
  setActivePinia(createPinia())
  provs = useProvStore()
})

test('fetch', () => {
  provs.fetch().then(() => {
    expect(provs.data[0].nombre).toBe('Albacete')
    expect(provs.data[0].label).toBe('02 Albacete')
    expect(provs.nombre('38')).toBe('Santa Cruz de Tenerife')
    expect(provs.nombre('03001')).toBe('Alicante')
  })
})
