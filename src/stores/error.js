import { defineStore } from "pinia"
import { toast } from "bulma-toast"
import i18n from "@/services/i18n"

const { t, te } = i18n.global

export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    error: null,
  }),

  getters: {
    message: (state) => {
      let msg = ""
      if (state.error.response && state.error.response.data) {
        msg = state.error.response.data.message
      } else if (state.error.message) {
        msg = state.error.message
      } else {
        msg = state.error
      }
      if (te(msg)) {
        return t(msg)
      }
      return msg
    },
    hasError: (state) => state.error !== null,
  },

  actions: {
    set(error) {
      this.error = error
      toast({
        message: this.message,
        type: "is-danger",
        position: "top-center",
        duration: 20000,
        dismissible: true,
        pauseOnHover: true,
        closeOnClick: false,
        offsetTop: "2.5em",
        opacity: 0.8,
      })
    },
    clear() {
      this.error = null
    },
  },
})
