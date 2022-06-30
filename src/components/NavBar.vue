<script setup>
import { ref } from "vue";
import LocaleSwitcher from "./LocaleSwitcher.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import api from "@/services/api";

const isActive = ref(false);
const userStore = useUserStore();
const router = useRouter();

function loginUrl() {
  const authPath = router.resolve({ name: "auth" });
  const authURL = new URL(authPath.href, window.location.href).href;
  return api.getUri({
    url: "/login",
    params: { callback: authURL },
  });
}

function logout() {
  userStore.logout().then(() => {
    router.replace({ name: "home" });
  });
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
        <h1 class="navbar-item is-size-3 has-text-weight-bold">
          CatAtom2Osm online
        </h1>
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
      <div class="navbar-end" v-if="userStore.isLogged">
        <a class="navbar-item" :href="$docUrl">{{ $t("Docs") }}</a>
        <locale-switcher></locale-switcher>
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">{{ userStore.username }}</a>
          <div class="navbar-dropdown is-right">
            <a class="navbar-item">
              <span class="icon">
                <font-awesome-icon icon="user-times" />
              </span>
              &nbsp;
              <span @click="logout">{{ $t("Logout") }}</span>
            </a>
          </div>
        </div>
      </div>
      <div class="navbar-end" v-else>
        <div class="navbar-item">
          <locale-switcher></locale-switcher>
        </div>
        <div class="navbar-item">
          <div class="field has-addons">
            <p class="control">
              <a
                class="button is-outlined"
                href="https://www.openstreetmap.org/user/new"
              >
                <span class="icon">
                  <font-awesome-icon icon="user-plus" />
                </span>
                <span>{{ $t("Sign up") }}</span>
              </a>
            </p>
            <p class="control">
              <a class="button is-info is-outlined" :href="loginUrl()">
                <span class="icon">
                  <font-awesome-icon icon="user" />
                </span>
                <span>{{ $t("Log in") }}</span>
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
</style>
