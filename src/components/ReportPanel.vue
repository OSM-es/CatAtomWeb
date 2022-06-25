<script setup>
import { useJobStore } from "@/stores/job";

const job = useJobStore();
</script>

<template>
  <vue-collapsible-panel
    class="panel"
    :expanded="job.estado != 'RUNNING' && job.estado != 'ERROR'"
  >
    <template #title>
      <p class="panel-heading">Informe</p>
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
