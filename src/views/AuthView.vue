<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()
const params = new URLSearchParams(window.location.search)

if (params.has('oauth_token') && params.has('oauth_verifier')) {
  userStore.login(params).then(() => {
    router.replace({ name: 'process' })
    return
  })
}
router.replace({ name: 'home' })
</script>

<template>
  <div></div>
</template>
