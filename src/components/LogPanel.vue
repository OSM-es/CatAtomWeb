<script setup>
import { useJobStore } from "@/stores/job"

const job = useJobStore()

function isActive() {
  return job.estado == "RUNNING" ? "is-info" : ""
}
</script>

<template>
  <vue-collapsible-panel class="panel" :class="isActive()">
    <template #title>
      <p class="panel-heading">{{ $t("Log") }}</p>
    </template>
    <template #content>
      <div class="panel-block">
        <div class="container">
          <p v-for="(row, i) in job.log" :key="i" class="terminal">
            {{ row }}
          </p>
          <div v-if="job.estado == 'RUNNING'" class="loader"></div>
        </div>
      </div>
    </template>
  </vue-collapsible-panel>
</template>
