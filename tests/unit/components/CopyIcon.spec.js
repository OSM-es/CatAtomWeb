/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import CopyIcon from '@/components/CopyIcon'

test('text is copied', async () => {
  Object.assign(navigator, {
    clipboard: {
      writeText: jest.fn(),
    },
  })
  const wrapper = shallowMount(CopyIcon, {
    slots: {
      default: 'text to copy',
    },
  })
  wrapper.get('button').trigger('click')
  expect(navigator.clipboard.writeText).toBeCalledWith('text to copy')
})
