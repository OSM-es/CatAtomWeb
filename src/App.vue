<template>
  <nav-bar />
  <div class="notification is-danger" v-if="errorStore.hasError">
    <button class="delete" @click="errorStore.clear"></button>
    {{ errorStore.message }}
  </div>
  <router-view />
</template>

<script setup>
import NavBar from "@/components/NavBar.vue";
import { useErrorStore } from "@/stores/error";

const errorStore = useErrorStore();
</script>
