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
    return i18n.t("The process is blocked by") + " " + job.propietario.username;
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
