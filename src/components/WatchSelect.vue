<script setup>
import { ref, watch } from "vue";

// eslint-disable-next-line no-undef
const props = defineProps({
  watchedValue: {},
  modelValue: { type: Object, default: null },
  fetchOptions: { type: Function, default: null },
  placeholder: { type: String, default: "" },
  label: { type: String, default: "label" },
  clearable: { type: Boolean, default: false },
});

// eslint-disable-next-line no-undef
const emit = defineEmits(["update:modelValue"]);

const options = ref([]);
const loading = ref(false);
const watchSelectRef = ref(null);

function emitUpdate(event) {
  if (event != props.modelValue) {
    emit("update:modelValue", event);
  }
}

watch(
  () => props.watchedValue,
  async (newValue) => {
    options.value = [];
    watchSelectRef.value.clearSelection();
    if (newValue) {
      if (props.fetchOptions) {
        loading.value = true;
        options.value = await props.fetchOptions(newValue);
      }
      loading.value = false;
    }
  }
);
</script>

<template>
  <div class="field">
    <div class="control">
      <v-select
        ref="watchSelectRef"
        :label="label"
        :placeholder="placeholder"
        :options="options"
        :clearable="clearable"
        :selectOnTab="true"
        :disabled="options.length == 0"
        :loading="loading"
        :value="modelValue"
        @update:modelValue="emitUpdate"
      >
        <!-- eslint-disable-next-line vue/no-unused-vars  -->
        <template no-options="{ search, searching, loading }">
          Lo siento, opción no encontrada.
        </template>
      </v-select>
    </div>
  </div>
</template>
