import i18n from '@/services/i18n'

const { t } = i18n.global

export function clipboardHandler(event, text) {
  const tooltip = event.target.attributes['data-tooltip'].value
  navigator.clipboard.writeText(text)
  event.target.attributes['data-tooltip'].value = t('done')
  setTimeout(() => {
    event.target.attributes['data-tooltip'].value = tooltip
  }, 5000)
}
