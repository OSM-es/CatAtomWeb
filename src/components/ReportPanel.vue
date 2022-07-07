<script setup>
import { useJobStore } from "@/stores/job"

const job = useJobStore()

function isExpanded() {
  return job.estado != "RUNNING" && job.estado != "ERROR"
}
</script>

<template>
  <vue-collapsible-panel class="panel" :expanded="isExpanded()">
    <template #title>
      <p class="panel-heading">{{ $t("Report") }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="container">
          <p v-for="(row, i) in job.informe" :key="i" class="terminal">
            {{ row }}
          </p>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
