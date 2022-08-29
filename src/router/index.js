import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'
import AuthView from '@/views/AuthView.vue'
import DocView from '@/views/doc/DocView.vue'
import DocFixmeView from '@/views/doc/DocFixmeView.vue'
import DocLoginView from '@/views/doc/DocLoginView.vue'
import DocProcessView from '@/views/doc/DocProcessView.vue'
import DocReviewView from '@/views/doc/DocReviewView.vue'
import DocSelectView from '@/views/doc/DocSelectView.vue'
import DocPublishView from '@/views/doc/DocPublishView.vue'
import ExploreView from '@/views/ExploreView.vue'
import HomeView from '@/views/HomeView.vue'
import ProcessView from '@/views/ProcessView.vue'

const routes = [
  { path: '/home', name: 'home', component: HomeView },
  { path: '/doc', name: 'doc', component: DocView },
  { path: '/doc/login', name: 'doc_login', component: DocLoginView },
  { path: '/doc/select', name: 'doc_select', component: DocSelectView },
  { path: '/doc/process', name: 'doc_process', component: DocProcessView },
  { path: '/doc/review', name: 'doc_review', component: DocReviewView },
  { path: '/doc/fixme', name: 'doc_fixme', component: DocFixmeView },
  { path: '/doc/publish', name: 'doc_publish', component: DocPublishView },
  {
    path: '/:munCode?/:divCode?',
    name: 'process',
    component: ProcessView,
    meta: {
      requiresAuth: true,
    },
  },
  { path: '/explore', name: 'explore', component: ExploreView },
  { path: '/auth', name: 'auth', component: AuthView },
  { path: '/login', component: ProcessView },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'is-active',
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
