import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import AuthView from '../views/AuthView.vue'
import HomeView from '../views/HomeView.vue'
import ProcessView from '../views/ProcessView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/',
    name: 'process',
    component: ProcessView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  to.matched.some((record) => {
    if (record.meta.requiresAuth) {
      userStore.update()
      if (userStore.isLogged) {
        next()
        return
      }
      next({ name: 'home' })
    } else {
      next()
    }
  })
})

export default router
