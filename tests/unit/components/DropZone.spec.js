/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { shallowMount } from '@vue/test-utils'
import DropZone from '@/components/DropZone'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(DropZone, {
    slots: {
      default: 'drag area is {{ dropZoneActive }}',
    },
  })
})

test('activate on dragenter', async () => {
  expect(wrapper.get('div').text()).toBe('drag area is false')
  wrapper.get('div').trigger('dragenter')
  await nextTick()
  expect(wrapper.get('div').text()).toBe('drag area is true')
})

test('activate on dragover', async () => {
  expect(wrapper.get('div').text()).toBe('drag area is false')
  wrapper.get('div').trigger('dragover')
  await nextTick()
  expect(wrapper.get('div').text()).toBe('drag area is true')
})

test('deactivate on dragleave', async () => {
  wrapper.get('div').trigger('dragenter')
  await nextTick()
  wrapper.get('div').trigger('dragleave')
  await nextTick()
  setTimeout(() => {
    expect(wrapper.get('div').text()).toBe('drag area is false')
  }, 100)
})

test('component is disabled', async () => {
  await wrapper.setProps({ disabled: true })
  wrapper.get('div').trigger('dragenter')
  await nextTick()
  expect(wrapper.get('div').text()).toBe('drag area is false')
  wrapper.get('div').trigger('dragleave')
  await nextTick()
  expect(wrapper.emitted()).not.toHaveProperty('files-dropped')
})

test('emit files on drop', async () => {
  wrapper.get('div').trigger('dragenter')
  wrapper.get('div').trigger('drop', { dataTransfer: { files: [1, 2] } })
  await nextTick()
  setTimeout(() => {
    expect(wrapper.get('div').text()).toBe('drag area is false')
  }, 100)
  const event = wrapper.emitted('files-dropped')
  expect(event).toHaveLength(1)
  expect(event[0][0]).toEqual([1, 2])
})
