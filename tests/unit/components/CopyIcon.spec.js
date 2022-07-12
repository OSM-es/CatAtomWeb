/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import CopyIcon from '@/components/CopyIcon'

test('text is copied', async () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
    },
  })
  const wrapper = mount(CopyIcon, {
    slots: {
      default: 'text to copy',
    },
  })
  await nextTick()
  wrapper.get('button').trigger('click')
  expect(navigator.clipboard.writeText).toBeCalledWith('text to copy')
})
