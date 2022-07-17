/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import FixmePanel from '@/components/FixmePanel'
import { useChatService } from '@/services/chat'
import { useJobStore } from '@/stores/job'
jest.mock('vue-i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/services/chat', () => require('../../mocks/services/chat'))
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/error', () => require('../../mocks/stores/error'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))

const chat = useChatService()
const job = useJobStore()
const f1 = { osm_id: '123', username: 'u1', filename: 'f1f1', fixmes: 2 }
const f2 = { osm_id: '321', username: 'u2', filename: 'f2f2', fixmes: 1 }
let wrapper = mount(FixmePanel)
wrapper.setProps({ fixmes: [f1, f2] })

test('show fixmes', () => {
  const html = wrapper.html()
  expect(html).toContain('f1f1')
  expect(html).toContain('f2f2')
})

test('trigger dragenter', async () => {
  expect(wrapper.html()).toContain('Drop here')
  expect(wrapper.html()).not.toContain('Drop them')
  wrapper.get('input').trigger('dragenter')
  await nextTick()
  expect(wrapper.html()).not.toContain('Drop here')
  expect(wrapper.html()).toContain('Drop them')
})

test('emit fixme', async () => {
  const data = { osm_id: '321' }
  chat.emit('fixme', data)
  expect(job.updateFixme).toHaveBeenCalledWith(data)
})

test('owner ignores emit fixme', async () => {
  const data = { osm_id: '123' }
  chat.emit('fixme', data)
  expect(job.updateFixme).not.toHaveBeenCalled()
})
