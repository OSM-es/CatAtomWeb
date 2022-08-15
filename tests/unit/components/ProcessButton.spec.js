/* eslint-disable no-undef */
import { mount } from '@vue/test-utils'
import ProcessButton from '@/components/ProcessButton'
import { useJobStore } from '@/stores/job'
jest.mock('vue-i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))

const job = useJobStore()
let wrapper

function initWrapper() {
  wrapper = mount(ProcessButton, {
    slots: { default: 'foobar' },
  })
}

test('not owner', () => {
  job.propietario = { osm_id: '321', username: 'foo' }
  initWrapper()
  expect(wrapper.get('button').text()).toBe('foobar')
  expect(wrapper.get('button').attributes()).toHaveProperty('disabled')
  expect(wrapper.get('div div div').attributes('data-tooltip')).toContain(
    'LOCKED BY foo'
  )
})

test('owner', () => {
  job.propietario = { osm_id: '123', username: 'bar' }
  initWrapper()
  expect(wrapper.get('button').text()).toBe('foobar')
  expect(wrapper.get('button').attributes()).not.toHaveProperty('disabled')
  expect(wrapper.get('div div div').attributes()).not.toHaveProperty(
    'data-tooltip'
  )
})
