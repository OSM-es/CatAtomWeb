<script setup>
// eslint-disable-next-line no-undef
defineProps({
  errors: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <p v-for="error of errors" :key="error.$uid" class="help is-danger">
    <i18n-t
      v-if="error.$validator == 'between'"
      keypath="between_val"
      scope="global"
    >
      <span>{{ error.$params.min }}</span>
      <span>{{ error.$params.max }}</span>
    </i18n-t>
    <span v-else>{{ $t(error.$message) }}</span>
  </p>
</template>
