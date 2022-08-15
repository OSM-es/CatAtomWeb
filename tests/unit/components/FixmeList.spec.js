/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { shallowMount } from '@vue/test-utils'
import FixmeList from '@/components/FixmeList'
import { useJobStore } from '@/stores/job'
import { i18nConf } from '@/services/i18n'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))

const job = useJobStore()

const fixmes = [
  { osm_id: '123', username: 'u1', filename: 'f1', fixmes: 2, locked: true },
  { osm_id: '123', username: 'u1', filename: 'f2', fixmes: 1, locked: false },
  { osm_id: '321', username: 'u2', filename: 'f3', fixmes: 1, locked: true },
  { osm_id: '321', username: 'u2', filename: 'f4', fixmes: 2, locked: false },
  { filename: 'f5', fixmes: 1 },
  { osm_id: '321', username: 'u2', filename: 'f6', fixmes: 1, locked: false },
]
const f6 = { filename: 'f6', percentCompleted: 30 }
const files = {
  fileExists: (filename) => filename == 'f6',
  getFile: (filename) => (filename == 'f6' ? f6 : null),
}
const wrapper = shallowMount(FixmeList, {
  props: { municipio: '66699', fixmes, files },
  global: { plugins: [createI18n(i18nConf)] },
})
const rows = wrapper.findAll('nav')

test('owner locked', () => {
  expect(rows).toHaveLength(6)
  expect(rows[0].get('div').attributes()['data-tooltip']).toBe('Locked by u1')
  expect(rows[0].get('a').attributes().href).toBe('results/66699/tasks/f1')
  expect(rows[0].get('a').attributes().class).not.toBe('is-disabled')
  expect(rows[0].get('input').isVisible()).toBeTruthy()
})

test('owner not locked', async () => {
  expect(rows[1].get('div').attributes()['data-tooltip']).toBe('Edited by u1')
  expect(rows[1].get('a').attributes().href).toBe('results/66699/tasks/f2')
  expect(rows[1].get('a').attributes().class).not.toBe('is-disabled')
  expect(rows[1].get('input').isVisible()).toBeTruthy()
  rows[1].get('input').element.value = ''
  await nextTick()
  rows[1].get('input').trigger('change')
  await expect(wrapper.emitted()).toHaveProperty('change')
  const event = wrapper.emitted('change')
  expect(event).toHaveLength(1)
  expect(event[0][0].length).toBe(0)
})

test('not owner locked', () => {
  expect(rows[2].get('div').attributes()['data-tooltip']).toBe('Locked by u2')
  expect(rows[2].get('a').attributes().href).toBe('results/66699/tasks/f3')
  expect(rows[2].get('a').attributes().class).toBe('is-disabled')
  expect(rows[2].get('input').isVisible()).toBeFalsy()
})

test('not owner not locked', () => {
  expect(rows[3].get('div').attributes()['data-tooltip']).toBe('Edited by u2')
  expect(rows[3].get('a').attributes().href).toBe('results/66699/tasks/f4')
  expect(rows[3].get('a').attributes().class).not.toBe('is-disabled')
  expect(rows[3].get('input').isVisible()).toBeFalsy()
})

test('upload not enabled', async () => {
  expect(rows[4].get('a').attributes().href).toBe('results/66699/tasks/f5')
  expect(rows[4].get('a').attributes().class).not.toBe('is-disabled')
  expect(rows[4].get('input').isVisible()).toBeFalsy()
  rows[4].get('a').trigger('click')
  await expect(job.getFixme).toHaveBeenCalled()
})

test('in progress', () => {
  expect(rows[5].text()).toMatch(/f6/)
  expect(rows[5].get('progress').text()).toMatch(/30%/)
})

test('colors', () => {
  const rows = wrapper.findAll('div > div')
  const c1 = rows[2].attributes().class
  const c2 = rows[3].attributes().class
  const c4 = rows[5].attributes().class
  expect(c1).not.toEqual(c2)
  expect(c1).toMatch(/color/)
  expect(c2).toMatch(/color/)
  expect(c4).not.toMatch(/color/)
})
