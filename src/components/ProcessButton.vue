<script setup>
import { useJobStore } from "../stores/job";
import { useUserStore } from "../stores/user";
import { useI18n } from "vue-i18n";

// eslint-disable-next-line no-undef
const job = useJobStore();
const i18n = useI18n();
const user = useUserStore();

function ownerTip() {
  if (!job.propietario || user.isOwner(job.propietario)) {
    return null;
  } else {
    return i18n.t("The process is locked by") + " " + job.propietario.username;
  }
}
</script>

<template>
  <div class="has-tooltip-arrow" :data-tooltip="ownerTip()">
    <button
      class="button is-link is-outlined is-fullwidth"
      :disabled="job.propietario && !user.isOwner(job.propietario)"
    >
      <slot></slot>
    </button>
  </div>
</template>
