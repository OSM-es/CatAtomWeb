<script setup>
import { useJobStore } from "../stores/job";
import JobPanel from "../components/JobPanel.vue";
import DonePanel from "../components/DonePanel.vue";
import FixmePanel from "../components/FixmePanel.vue";
import LogPanel from "../components/LogPanel.vue";
import ReportPanel from "../components/ReportPanel.vue";
import ReviewPanel from "../components/ReviewPanel.vue";
import ProcessPanelGroup from "../components/ProcessPanelGroup.vue";

const job = useJobStore();

function updateLog() {
  job.getJob(job.data.cod_municipio, job.data.cod_division).then(() => {
    if (job.data.estado == "RUNNING") {
      setTimeout(() => {
        updateLog();
      }, 500);
    }
  });
}

function updateProcess() {
  job.createJob().then(() => {
    updateLog();
  });
}
</script>

<template>
  <section class="section">
    <div class="content">
      <div class="columns">
        <div class="column is-one-quarter">
          <job-panel></job-panel>
          <process-panel-group
            v-if="job.data.cod_municipio !== null"
            @updateProcess="updateProcess"
          >
          </process-panel-group>
        </div>
        <div class="column">
          <vue-collapsible-panel-group v-if="job.data.cod_municipio">
            <done-panel v-if="job.data.estado == 'DONE'"></done-panel>
            <review-panel v-if="job.data.estado == 'REVIEW'"></review-panel>
            <fixme-panel
              v-if="job.data.estado == 'FIXME'"
              :fixmes="job.data.revisar"
              :municipio="job.data.cod_municipio"
            ></fixme-panel>
            <report-panel v-if="job.data.informe.length > 0"></report-panel>
            <log-panel v-if="job.data.estado != 'AVAILABLE'"></log-panel>
          </vue-collapsible-panel-group>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.terminal {
  font-family: monospace;
  margin-bottom: 0 !important;
}
</style>
