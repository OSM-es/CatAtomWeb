import { defineStore } from "pinia";
import { toast } from "bulma-toast";

export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    error: null,
  }),

  getters: {
    message: (state) => {
      if (state.error.response) {
        return state.error.response.data.message;
      } else if (state.error.message) {
        return state.error.message;
      } else {
        return state.error;
      }
    },
    hasError: (state) => state.error !== null,
  },

  actions: {
    set(error) {
      this.error = error;
      toast({
        message: error,
        type: "is-danger",
        position: "top-center",
        duration: 20000,
        dismissible: true,
        pauseOnHover: true,
        closeOnClick: false,
        offsetTop: "2.5em",
        opacity: 0.8,
      });
    },
    clear() {
      this.error = null;
    },
  },
});
