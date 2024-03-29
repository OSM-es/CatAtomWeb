/* eslint-disable no-undef */
import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import { shallowMount } from '@vue/test-utils'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import { i18nConf } from '@/services/i18n'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))

const UntranslatedComponent = {
  template: '<div>{{ $t("untranslated") }}</div>',
}

function initWrapper(component) {
  return shallowMount(component, {
    global: {
      plugins: [createI18n(i18nConf)],
    },
  })
}

test('translates component to English', () => {
  const wrapper = initWrapper(LocaleSwitcher)
  expect(wrapper.get('[data-test="locale"]').text()).toBe('English')
})

test('translates component to Spanish', async () => {
  const wrapper = initWrapper(LocaleSwitcher)
  wrapper.get('[data-test="locale-es"]').trigger('click')
  await nextTick()
  expect(wrapper.get('[data-test="locale"]').text()).toBe('Español')
})

test('falls back to English if language dictionary is not found', async () => {
  const wrapper = initWrapper(LocaleSwitcher)
  wrapper.rootVM.$i18n.locale = 'xx'
  await nextTick()
  expect(wrapper.get('[data-test="locale"]').text()).toBe('English')
})

test('falls back to key value if key not found', () => {
  const wrapper = initWrapper(UntranslatedComponent)
  expect(wrapper.text()).toBe('untranslated')
})
