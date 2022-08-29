<script setup>
import debounce from 'lodash.debounce'

// eslint-disable-next-line no-undef
defineProps({
  modelValue: { type: String, default: '' },
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue'])

const editHandler = debounce((event) => {
  emit('update:modelValue', event.target.value)
}, 500)

function deleteHandler() {
  editHandler({ target: { value: '' } })
}
</script>

<template>
  <div class="field has-addons has-addons-right ml-auto">
    <div class="control has-icons-right">
      <input
        ref="filterInput"
        :value="modelValue"
        :placeholder="$t('Filter')"
        class="input"
        @input="editHandler"
      />
      <span class="icon is-right">
        <font-awesome-icon icon="search" />
      </span>
    </div>
    <div class="control">
      <a
        class="button has-tooltip-arrow has-tooltip-right"
        :data-tooltip="$t('Delete filter')"
        @click="deleteHandler"
      >
        <font-awesome-icon icon="times" />
      </a>
    </div>
  </div>
</template>
