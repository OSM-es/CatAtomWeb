import { defineStore } from "pinia";
import api from "@/api";

export const useJobStore = defineStore({
  id: "job",
  state: () => ({
    data: { cod_municipio: null },
  }),

  getters: {},

  actions: {
    async getJob(cod_municipio, cod_division) {
      const provincia = cod_municipio.substring(0, 2);
      const response = await api.getJob(cod_municipio, cod_division);
      this.data = response.data;
      if (this.data.informe.length == 0) {
        this.data.edificios = true;
        this.data.direcciones = true;
        this.data.idioma = "es_ES";
        if (
          ["03", "07", "08", "12", "17", "25", "43", "46"].includes(provincia)
        ) {
          this.data.idioma = "ca_ES";
        } else if (["15", "27", "32", "36"].includes(provincia)) {
          this.data.idioma = "gl_ES";
        }
      } else {
        this.data.edificios = "building_date" in this.data.report;
        this.data.direcciones = "address_date" in this.data.report;
        this.data.idioma = this.data.report.language;
      }
    },
    async createJob() {
      const options = {
        building: this.data.edificios,
        address: this.data.direcciones,
        idioma: this.data.idioma,
      };
      const mun = this.data.cod_municipio;
      const div = this.data.cod_division;
      const response = await api.postJob(mun, div, options);
      this.data.estado = response.data.estado;
      this.data.mensaje = response.data.mensaje;
      return response;
    },
    async updateHighway(cat, conv) {
      let formData = new FormData();
      formData.append("cat", cat);
      formData.append("conv", conv);
      const response = await api.putHgw(this.data.cod_municipio, formData);
      if (response.data.length > 0) {
        this.data.callejero = response.data;
      }
    },
  },
});
