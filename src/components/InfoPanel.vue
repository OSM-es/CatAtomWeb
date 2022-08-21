<script setup>
import { useJobStore } from '@/stores/job'
import { wikiUrl } from '@/utils'

const adminUrl = wikiUrl('ES:Tag:boundary=administrative')
const job = useJobStore()

function getStatus() {
  if (job.info.inp_parts > process.env.VUE_APP_PROJECT_SIZE_LIMIT) {
    return 'ko'
  } else {
    return 'ok'
  }
}
</script>

<template>
  <vue-collapsible-panel class="panel is-info">
    <template #title>
      <p class="panel-heading">{{ $t('Information') }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="content">
          <p class="label mt-2">{{ $t('Buildings') }}</p>
          <ul>
            <li>{{ $t('Source date') }}: {{ job.info.building_date }}</li>
            <li>{{ $t('Feature count') }}: {{ job.info.inp_features }}</li>
            <ul>
              <li>{{ $t('Buildings') }}: {{ job.info.inp_buildings }}</li>
              <li>{{ $t('Building parts') }}: {{ job.info.inp_parts }}</li>
              <li>{{ $t('Pools') }}: {{ job.info.inp_pools }}</li>
            </ul>
          </ul>
        </div>
      </div>
      <div class="panel-block">
        <div class="content">
          <p class="label mt-2">{{ $t('Addresses') }}</p>
          <ul>
            <li>{{ $t('Source date') }}: {{ job.info.address_date }}</li>
            <li>{{ $t('Feature count') }}: {{ job.info.inp_address }}</li>
          </ul>
        </div>
      </div>
      <div>
        <article v-if="getStatus() == 'ok'" class="message is-success">
          <div class="message-body">
            {{ $t('project-size-ok') }}
          </div>
        </article>
        <article v-else class="message is-warning">
          <div class="message-body">
            <i18n-t keypath="project-size-ko" scope="global">
              <a :href="adminUrl">{{ $t('admin-boundaries') }}</a>
            </i18n-t>
          </div>
        </article>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
