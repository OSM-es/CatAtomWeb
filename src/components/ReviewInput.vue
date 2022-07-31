<script setup>
import { ref } from 'vue'
import debounce from 'lodash.debounce'

// eslint-disable-next-line no-undef
const props = defineProps({
  modelKey: { type: Number, default: 0 },
  modelValue: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  active: { type: Boolean, default: true },
})
// eslint-disable-next-line no-undef
const emit = defineEmits(['update:modelValue', 'focus:input'])
const value = ref(props.modelValue)

const editHandler = debounce(() => {
  emit('update:modelValue', props.modelKey, value.value)
}, 500)

function deleteHandler() {
  value.value = ''
  editHandler()
}
</script>

<template>
  <div class="field has-addons">
    <div class="control is-expanded has-tooltip-arrow" :data-tooltip="tooltip">
      <input
        v-model="value"
        class="input"
        :readonly="!active"
        @input="editHandler"
        @focus="emit('focus:input')"
      />
    </div>
    <div v-if="active" class="control">
      <button
        class="button has-tooltip-arrow"
        :data-tooltip="$t('Delete')"
        @click="deleteHandler"
      >
        <font-awesome-icon icon="times" />
      </button>
    </div>
    <div class="control">
      <button
        v-if="active"
        class="button has-tooltip-arrow"
        :data-tooltip="$t('Validate')"
        @click="editHandler"
      >
        <font-awesome-icon icon="check" />
      </button>
    </div>
  </div>
</template>
