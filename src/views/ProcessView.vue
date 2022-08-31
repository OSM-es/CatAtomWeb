<script setup>
import { useJobStore } from '@/stores/job'
import { useRoute } from 'vue-router'
import AdminPanel from '@/components/AdminPanel.vue'
import ChatPanel from '@/components/ChatPanel.vue'
import DonePanel from '@/components/DonePanel.vue'
import FixmePanel from '@/components/FixmePanel.vue'
import InfoPanel from '@/components/InfoPanel.vue'
import JobPanel from '@/components/JobPanel.vue'
import LogPanel from '@/components/LogPanel.vue'
import ReviewPanel from '@/components/ReviewPanel.vue'
import ProcessPanelGroup from '@/components/ProcessPanelGroup.vue'

const job = useJobStore()
const route = useRoute()

const munCode = route.params.munCode
const divCode = route.params.divCode
if (munCode) {
  localStorage.setItem('municipio', munCode)
}
if (divCode) {
  localStorage.setItem('division', divCode)
}

function fixmeEnabled() {
  return job.revisar.length > 0 && job.estado != 'RUNNING'
}

function reviewEnabled() {
  return job.callejero.length > 0 && job.estado != 'RUNNING'
}

function reportEnabled() {
  return job.informe.length > 0 && job.estado != 'RUNNING'
}
</script>

<template>
  <section class="section">
    <div class="content">
      <div class="columns">
        <div class="column is-one-fifth">
          <job-panel></job-panel>
          <process-panel-group v-if="job.cod_municipio !== null">
          </process-panel-group>
          <admin-panel v-if="job.cod_municipio !== null"></admin-panel>
        </div>
        <div class="column is-three-fifths">
          <vue-collapsible-panel-group v-if="job.cod_municipio">
            <info-panel v-if="job.info"></info-panel>
            <done-panel v-if="job.estado == 'DONE'"></done-panel>
            <fixme-panel
              v-if="fixmeEnabled()"
              :fixmes="job.revisar"
              :municipio="job.cod_municipio"
            ></fixme-panel>
            <review-panel v-if="reviewEnabled()"></review-panel>
            <log-panel v-if="reportEnabled()" data-test="report" title="Report">
            </log-panel>
            <log-panel
              v-if="job.estado != 'AVAILABLE'"
              data-test="log"
              title="Log"
            ></log-panel>
          </vue-collapsible-panel-group>
        </div>
        <div v-if="job.cod_municipio" class="column is-one-fifth">
          <chat-panel></chat-panel>
        </div>
      </div>
    </div>
  </section>
</template>
