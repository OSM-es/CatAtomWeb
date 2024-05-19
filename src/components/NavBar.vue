<script setup>
import { ref } from 'vue'
import LocaleSwitcher from './LocaleSwitcher.vue'
import { useUserStore } from '@/stores/user'
import api from '@/services/api'

const isActive = ref(false)
const userStore = useUserStore()

function loginUrl() {
  return api.getUri({ url: '/login' })
}

function logoutUrl() {
  return api.getUri({ url: '/logout' })
}
</script>

<template>
  <nav class="navbar has-shadow">
    <div class="navbar-brand">
      <router-link class="navbar-item" :to="{ name: 'process' }">
        <img
          alt="Spanish Cadastre Buildings Import"
          src="@/assets/logo.svg"
          class="navbar-item logo"
        />
        <div class="navbar-item">
          <div class="content">
            <h1 class="is-size-3 mb-0 has-text-weight-bold">CatAtom2OSM</h1>
            <p class="is-size-6">online</p>
          </div>
        </div>
      </router-link>
      <div
        class="navbar-burger burger"
        :class="{ 'is-active': isActive }"
        data-target="topNav"
        @click="isActive = !isActive"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    <div id="topNav" :class="{ 'is-active': isActive }" class="navbar-menu">
      <div v-if="userStore.isLogged" class="navbar-start">
        <router-link class="navbar-item" :to="{ name: 'process' }">
          {{ $t('Process') }}
        </router-link>
        <router-link class="navbar-item" :to="{ name: 'explore' }">
          {{ $t('Explore') }}
        </router-link>
      </div>
      <div class="navbar-end">
        <router-link to="/doc" class="navbar-item">
          {{ $t('Docs') }}
        </router-link>
        <div class="navbar-item">
          <locale-switcher></locale-switcher>
        </div>
        <div
          v-if="userStore.isLogged"
          class="navbar-item has-dropdown is-hoverable"
        >
          <a class="navbar-link" data-test="user">{{ userStore.username }}</a>
          <div class="navbar-dropdown is-right">
            <a data-test="logout" class="navbar-item">
              <span class="icon">
                <font-awesome-icon icon="user-times" />
              </span>
              &nbsp;
              <a :href="logoutUrl()">{{ $t('Logout') }}</a>
            </a>
          </div>
        </div>
        <div v-else class="navbar-item">
          <div class="field has-addons">
            <p class="control">
              <a
                class="button is-outlined"
                href="https://www.openstreetmap.org/user/new"
              >
                <span class="icon">
                  <font-awesome-icon icon="user-plus" />
                </span>
                <span>{{ $t('Sign up') }}</span>
              </a>
            </p>
            <p class="control">
              <a
                data-test="login"
                class="button is-info is-outlined"
                :href="loginUrl()"
              >
                <span class="icon">
                  <font-awesome-icon icon="user" />
                </span>
                <span>{{ $t('Log in') }}</span>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.logo {
  max-height: 4em !important;
}
.navbar-item {
  padding: 0.25em 0.75em !important;
}
a.navbar-item.is-active {
  background-color: white !important;
}
</style>
