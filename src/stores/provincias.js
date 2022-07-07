import { defineStore } from "pinia"
import api from "@/services/api"

export const useProvStore = defineStore({
  id: "provincias",
  state: () => ({
    data: [],
  }),

  getters: {
    get(state) {
      return state.data
    },
    nombre: (state) => {
      return (code) => {
        return state.data.find(
          (prov) => prov.cod_provincia == code.substring(0, 2)
        ).nombre
      }
    },
    ca_provs: () => ["03", "07", "08", "12", "17", "25", "43", "46"],
    gl_provs: () => ["15", "27", "32", "36"],
  },

  actions: {
    async fetch() {
      const response = await api.getProv()
      this.data = response.data.provincias.map((prov) => ({
        cod_provincia: prov.cod_provincia,
        nombre: prov.nombre,
        label: prov.cod_provincia + " " + prov.nombre,
      }))
    },
  },
})
