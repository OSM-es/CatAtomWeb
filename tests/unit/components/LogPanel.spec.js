/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import LogPanel from '@/components/LogPanel'
import { useJobStore } from '@/stores/job'
jest.mock('vue-i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))

const job = useJobStore()
let wrapper

function initWrapper(title) {
  wrapper = mount(LogPanel, { props: { title } })
}

test('test log', () => {
  job.estado = 'RUNNING'
  job.log = ['foo', 'bar', 'taz']
  initWrapper('Log')
  expect(wrapper.get('p').text()).toBe('Log')
  expect(wrapper.get('div').attributes('class')).toContain('is-info')
  const rows = wrapper.findAll('p.terminal')
  expect(rows[0].text()).toBe('foo')
  expect(rows[1].text()).toBe('bar')
  expect(rows[2].text()).toBe('taz')
  expect(wrapper.find('div.loader').exists()).toBeTruthy()
})

test('test report', () => {
  job.estado = 'REVIEW'
  job.informe = ['taz', 'bar', 'foo']
  initWrapper('Report')
  expect(wrapper.get('p').text()).toBe('Report')
  expect(wrapper.get('div').attributes('class')).not.toContain('is-info')
  const rows = wrapper.findAll('p.terminal')
  expect(rows[0].text()).toBe('taz')
  expect(rows[1].text()).toBe('bar')
  expect(rows[2].text()).toBe('foo')
  expect(wrapper.find('div.loader').exists()).toBeFalsy()
})
