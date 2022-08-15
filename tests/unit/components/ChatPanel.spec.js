/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import ChatPanel from '@/components/ChatPanel'
import { useJobStore } from '@/stores/job'
const sendMessage = jest.fn()
const chat = { useChatService: () => ({ sendMessage }) }
jest.mock('@/services/chat', () => chat)
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/job', () => require('../../mocks/stores/job'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))

let job = useJobStore()

function initWrapper() {
  return shallowMount(ChatPanel)
}

test('on button click sendMessage is called with message value', async () => {
  const wrapper = initWrapper()
  wrapper.get('textarea').setValue('lorem ipsum')
  wrapper.get('button').trigger('click')
  expect(sendMessage).toBeCalledWith('lorem ipsum')
  await nextTick()
  expect(wrapper.get('textarea').element.value).toBe('')
})

test('on enter sendMessage is called with message value', async () => {
  const wrapper = initWrapper()
  wrapper.get('textarea').setValue('lorem ipsum')
  wrapper.get('textarea').trigger('keydown.enter')
  expect(sendMessage).toBeCalledWith('lorem ipsum')
  await nextTick()
  expect(wrapper.get('textarea').element.value).toBe('')
})

test('on shift+enter adds newline', async () => {
  const wrapper = initWrapper()
  wrapper.get('textarea').setValue('lorem ipsum')
  wrapper.get('textarea').trigger('keydown.enter.shift')
  expect(sendMessage).not.toBeCalled()
  await nextTick()
  expect(wrapper.get('textarea').element.value).toBe('lorem ipsum\n')
})

test('show messages', () => {
  job.charla = [
    'lorem ipsum',
    { username: 'Cervantes', message: 'bla bla bla' },
    { username: 'foo', message: 'bar\ntaz' },
  ]
  const wrapper = initWrapper()
  const messages = wrapper.get('[data-test="chat"').findAll('div')
  expect(messages).toHaveLength(3)
  expect(messages[0].text()).toBe('lorem ipsum')
  expect(messages[1].attributes().class).toMatch(/right/)
  expect(messages[1].text()).toMatch(/Cervantes/)
  expect(messages[1].text()).toMatch(/bla bla bla/)
  expect(messages[1].findAll('p')).toHaveLength(2)
  expect(messages[2].attributes().class).toMatch(/left/)
  expect(messages[2].text()).toMatch(/foo/)
  expect(messages[2].findAll('p')).toHaveLength(3)
})
