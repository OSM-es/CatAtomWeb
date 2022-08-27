import { defineStore } from 'pinia'
import { toast } from 'bulma-toast'
import i18n from '@/services/i18n'

const { t, te } = i18n.global

export const useFlashStore = defineStore({
  id: 'flash',
  state: () => ({
    flash: null,
  }),

  getters: {
    message: (state) => {
      let msg = ''
      if (!state.flash) {
        return
      }
      if (state.flash.response && state.flash.response.data) {
        msg = state.flash.response.data.message
      } else if (state.flash.message) {
        msg = state.flash.message
      } else {
        msg = state.flash
      }
      if (te(msg)) {
        return t(msg)
      }
      return msg
    },
    hasFlash: (state) => state.flash !== null,
  },

  actions: {
    set(flash, type = 'is-danger') {
      const prevMsg = this.message
      this.flash = flash
      if (this.message != prevMsg) {
        toast({
          message: this.message,
          type,
          position: 'top-center',
          duration: 20000,
          dismissible: true,
          pauseOnHover: true,
          closeOnClick: false,
          offsetTop: '2.5em',
          opacity: 0.8,
        })
      }
    },
    clear() {
      this.flash = null
    },
  },
})
