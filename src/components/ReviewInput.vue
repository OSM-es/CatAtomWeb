<script setup>
import debounce from 'lodash.debounce'

// eslint-disable-next-line no-undef
const props = defineProps({
  modelKey: { type: Number, default: 0 },
  modelValue: { type: String, default: '' },
  tooltip: { type: String, default: '' },
  active: { type: Boolean, default: true },
  username: { type: String, default: '' },
})
// eslint-disable-next-line no-undef
const emit = defineEmits([
  'update:modelValue',
  'undo:modelValue',
  'focus:input',
])

const editHandler = debounce((event) => {
  emit('update:modelValue', event.target.value, props.modelKey)
}, 500)

function deleteHandler() {
  editHandler({ target: { value: '' } })
}

function validateHandler() {
  editHandler({ target: { value: props.modelValue } })
}

function undoHandler() {
  emit('undo:modelValue', props.modelKey)
}
</script>

<template>
  <div class="field has-addons">
    <div class="control is-expanded has-tooltip-arrow" :data-tooltip="tooltip">
      <input
        :value="modelValue"
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
        v-if="active && username"
        class="button has-tooltip-arrow"
        :data-tooltip="$t('Undo')"
        @click="undoHandler"
      >
        <font-awesome-icon icon="undo" />
      </button>
      <button
        v-else
        class="button has-tooltip-arrow"
        :data-tooltip="$t('Validate')"
        @click="validateHandler"
      >
        <font-awesome-icon icon="check" />
      </button>
    </div>
  </div>
</template>
