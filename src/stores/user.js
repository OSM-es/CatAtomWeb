import { defineStore } from 'pinia'
import api from '@/services/api'
import { reject } from 'lodash'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: localStorage.getItem('username') || '',
    osmId: localStorage.getItem('osmId') || 0,
    token: localStorage.getItem('token') || '',
  }),

  getters: {
    userData: (state) => ({ osm_id: state.osmId, username: state.username }),
    isLogged: (state) => (state.osmId ? true : false),
    isOwner: (state) => {
      return (owner) => owner && state.osmId == owner.osm_id
    },
  },

  actions: {
    login() {
      return new Promise((resolve) => {
        api
          .getUser()
          .then((response) => {
            this.username = response.data.username || ''
            this.osmId = response.data.osm_id || 0
            this.token = response.data.session_token || ''
            api.defaults.headers.common[
              'Authorization'
            ] = `bearer ${this.token}`
            resolve(response)
          })
          .catch(() => {
            this.$reset
            reject()
          })
      })
    },
  },
})
