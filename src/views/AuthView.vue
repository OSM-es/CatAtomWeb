<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

userStore.login().then(() => {
  if (userStore.isLogged) {
    router.replace({ name: 'process' })
  }
})
router.replace({ name: 'home' })
</script>

<template>
  <div></div>
</template>
