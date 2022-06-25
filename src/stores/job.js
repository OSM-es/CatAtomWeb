import { defineStore } from "pinia";
import api from "@/services/api";
import { useChatService } from "@/services/chat";
import { useProvStore } from "@/stores/provincias";

const chat = useChatService();

export const useJobStore = defineStore({
  id: "job",
  state: () => ({
    cod_municipio: null,
    cod_division: null,
    estado: "",
    propietario: null,
    mensaje: "",
    linea: 0,
    log: [],
    informe: [],
    report: {},
    revisar: [],
    callejero: [],
    participantes: 0,
    charla: [],
  }),

  getters: {
    provincia: (state) => state.cod_municipio.substring(0, 2),
    nombreZona(state) {
      const provincias = useProvStore();
      let name = state.report.split_name;
      name = name ? name + ", " : "";
      name = name + state.report.mun_name;
      let prov = provincias.nombre(state.report.mun_code);
      name = prov != state.report.mun_name ? name + " (" + prov + ")" : name;
      return name;
    },
    opciones(state) {
      return state.edificios
        ? state.direcciones
          ? "edificios y direcciones"
          : "edificios"
        : "direcciones";
    },
    options(state) {
      return state.edificios
        ? state.direcciones
          ? "buildings and addresses"
          : "buildings"
        : "addresses";
    },
    tags(state) {
      return state.edificios
        ? state.direcciones
          ? "buildings, addresses"
          : "buildings"
        : "addresses";
    },
  },

  actions: {
    updateJob(data) {
      const linea = this.estado == "RUNNING" ? this.linea : 0;
      const log = linea < this.log.length ? [] : this.log;
      const provincias = useProvStore();
      this.$state = data;
      this.log = log.concat(this.log);
      if (this.informe.length == 0) {
        this.edificios = true;
        this.direcciones = true;
        this.idioma = "es_ES";
        if (provincias.ca_provs.includes(this.provincia)) {
          this.idioma = "ca_ES";
        } else if (provincias.gl_provs.includes(this.provincia)) {
          this.idioma = "gl_ES";
        }
      } else {
        this.edificios = "building_date" in this.report;
        this.direcciones = "address_date" in this.report;
        this.idioma = this.report.language;
      }
    },
    async getJob(cod_municipio, cod_division) {
      const linea = this.estado == "RUNNING" ? this.linea : 0;
      const response = await api.getJob(cod_municipio, cod_division, linea);
      this.updateJob(response.data);
    },
    async createJob() {
      const options = {
        building: this.edificios,
        address: this.direcciones,
        idioma: this.idioma,
      };
      const mun = this.cod_municipio;
      const div = this.cod_division;
      const response = await api.postJob(mun, div, options);
      this.estado = response.data.estado;
      this.mensaje = response.data.mensaje;
      return response;
    },
    async deleteJob() {
      const response = await api.deleteJob(
        this.cod_municipio,
        this.cod_division
      );
      this.updateJob(response.data);
      chat.socket.emit("updateJob", "delete", this.cod_municipio);
    },
    async updateHighway(cat, conv) {
      let formData = new FormData();
      formData.append("cat", cat);
      formData.append("conv", conv);
      const response = await api.putHgw(this.cod_municipio, formData);
      if (response.data.length > 0) {
        this.callejero = response.data;
      }
    },
  },
});
