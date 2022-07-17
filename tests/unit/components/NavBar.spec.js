/* eslint-disable no-undef */
import { shallowMount } from '@vue/test-utils'
import router from '@/router'
import NavBar from '@/components/NavBar'
import { useUserStore } from '@/stores/user'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/stores/user', () => require('../../mocks/stores/user'))

const user = useUserStore()
let wrapper

function initWrapper() {
  wrapper = shallowMount(NavBar, { global: { plugins: [router] } })
}

test('not logged', () => {
  initWrapper()
  expect(wrapper.find('[data-test="login"]').exists()).toBeTruthy()
  expect(wrapper.find('[data-test="logout"]').exists()).toBeFalsy()
})

test('logged', () => {
  user.login()
  initWrapper()
  expect(wrapper.find('[data-test="login"]').exists()).toBeFalsy()
  expect(wrapper.find('[data-test="logout"]').exists()).toBeTruthy()
})
