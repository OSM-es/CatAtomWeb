import { defineStore } from "pinia";

export const useErrorStore = defineStore({
  id: "error",
  state: () => ({
    error: null,
  }),

  getters: {
    message: (state) => {
      if (state.error.response) {
        return state.error.response.data.message;
      } else {
        return state.error.message;
      }
    },
    hasError: (state) => state.error !== null,
  },

  actions: {
    set(error) {
      this.error = error;
    },
    clear() {
      this.error = null;
    },
  },
});
