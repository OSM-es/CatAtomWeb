<script setup>
import { useJobStore } from "../stores/job";
import { useUserStore } from "../stores/user";

// eslint-disable-next-line no-undef
const job = useJobStore();
const user = useUserStore();

function ownerTip() {
  if (!job.propietario || user.isOwner(job.propietario)) {
    return null;
  } else {
    return "El proceso está bloqueado por " + job.propietario.username;
  }
}
</script>

<template>
  <button
    class="button is-link is-outlined is-fullwidth has-tooltip-arrow"
    :disabled="job.propietario && !user.isOwner(job.propietario)"
    :data-tooltip="ownerTip()"
  >
    <slot></slot>
  </button>
</template>
