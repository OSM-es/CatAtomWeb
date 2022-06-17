import { defineStore } from "pinia";
import api from "@/api";

export const useProvStore = defineStore({
  id: "provincias",
  state: () => ({
    data: [],
  }),

  getters: {
    get(state) {
      return state.data;
    },
    nombre: (state) => {
      return (code) => {
        return state.data.find(
          (prov) => prov.cod_provincia == code.substring(0, 2)
        ).nombre;
      };
    },
  },

  actions: {
    async fetch() {
      const response = await api.getProv();
      this.data = response.data.provincias.map((prov) => ({
        cod_provincia: prov.cod_provincia,
        nombre: prov.nombre,
        label: prov.cod_provincia + " " + prov.nombre,
      }));
    },
  },
});
