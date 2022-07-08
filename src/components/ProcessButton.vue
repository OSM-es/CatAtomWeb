<script setup>
import { useJobStore } from '../stores/job'
import { useUserStore } from '../stores/user'
import { useI18n } from 'vue-i18n'

// eslint-disable-next-line no-undef
const job = useJobStore()
const i18n = useI18n()
const user = useUserStore()

function isDisabled() {
  return job.propietario && !user.isOwner(job.propietario)
}

function ownerTip() {
  if (isDisabled()) {
    return i18n.t('The process is locked by') + ' ' + job.propietario.username
  } else {
    return null
  }
}
</script>

<template>
  <div class="container">
    <div class="has-tooltip-arrow" :data-tooltip="ownerTip()">
      <button
        class="button is-link is-outlined is-fullwidth"
        :disabled="isDisabled()"
      >
        <slot></slot>
      </button>
    </div>
  </div>
</template>
