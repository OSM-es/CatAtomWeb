import { defineStore } from 'pinia'
var array = require('lodash/array')
import api from '@/services/api'
import { useProvStore } from '@/stores/provincias'

export const useJobStore = defineStore({
  id: 'job',
  state: () => ({
    cod_municipio: null,
    cod_division: null,
    estado: '',
    propietario: null,
    mensaje: '',
    linea: 0,
    log: [],
    informe: [],
    report: {},
    revisar: [],
    callejero: [],
    info: null,
    participantes: 0,
    charla: [],
    next_args: '',
  }),

  getters: {
    provincia: (state) => state.cod_municipio.substring(0, 2),
    nombreZona(state) {
      const provincias = useProvStore()
      let name = state.report.split_name
      name = name ? name + ', ' : ''
      name = name + state.report.mun_name
      let prov = provincias.nombre(state.report.mun_code)
      name = prov != state.report.mun_name ? name + ' (' + prov + ')' : name
      return name
    },
    opciones(state) {
      return state.edificios
        ? state.direcciones
          ? 'edificios y direcciones'
          : 'edificios'
        : 'direcciones'
    },
    options(state) {
      return state.edificios
        ? state.direcciones
          ? 'buildings and addresses'
          : 'buildings'
        : 'addresses'
    },
    fixmes(state) {
      return state.revisar.reduce(
        (total, fixme) => total + Number(fixme.fixmes),
        0
      )
    },
    highways(state) {
      return state.callejero.reduce(
        (total, row) => total + (row.length < 3 || !row[2] ? 1 : 0),
        0
      )
    },
    args(state) {
      if (state.edificios && !state.direcciones) {
        return '-b'
      }
      if (state.direcciones && !state.edificios) {
        return '-d'
      }
    },
    nextMsg(state) {
      if (state.next_args == '-b') {
        return 'Process buildings'
      }
      if (state.next_args == '-d') {
        return 'Process addresses'
      }
    },
  },

  actions: {
    updateJob(data) {
      const linea = this.estado == 'RUNNING' ? this.linea : 0
      const log = linea < this.log.length ? [] : this.log
      const provincias = useProvStore()
      this.$state = data
      this.cod_division = this.cod_division || null
      this.log = log.concat(this.log)
      if (this.informe.length == 0) {
        this.edificios = true
        this.direcciones = true
        this.idioma = 'es_ES'
        if (provincias.ca_provs.includes(this.provincia)) {
          this.idioma = 'ca_ES'
        } else if (provincias.gl_provs.includes(this.provincia)) {
          this.idioma = 'gl_ES'
        }
      } else {
        this.edificios = 'building_date' in this.report
        this.direcciones = 'address_date' in this.report
        this.idioma = this.report.language
      }
    },
    async getHighway(street) {
      const resp = await api.getHgw(this.cod_municipio, street)
      return resp.data
    },
    async putHighway(cat, conv) {
      const response = await api.putHgw(this.cod_municipio, { cat, conv })
      this.updateHighway(response.data)
    },
    async postHighway(cat, conv) {
      const response = await api.postHgw(this.cod_municipio, { cat, conv })
      this.updateHighway(response.data)
    },
    updateHighway(data) {
      const i = array.findIndex(this.callejero, (row) => row[0] == data.cat)
      this.callejero[i] = [data.cat, data.conv, data.osm_id, data.username]
    },
    updateFixme(data) {
      const i = array.findIndex(this.revisar, { filename: data.filename })
      this.revisar[i] = data
    },
    async getJob(cod_municipio, cod_division) {
      if (cod_municipio) {
        const linea = this.estado == 'RUNNING' ? this.linea : 0
        const response = await api.getJob(cod_municipio, cod_division, linea)
        this.updateJob(response.data)
      }
    },
    async createJob() {
      const options = {
        building: this.edificios,
        address: this.direcciones,
        idioma: this.idioma,
      }
      const mun = this.cod_municipio
      const div = this.cod_division
      const response = await api.postJob(mun, div, options)
      this.estado = response.data.estado
      this.mensaje = response.data.mensaje
      return response
    },
    async deleteJob() {
      const response = await api.deleteJob(
        this.cod_municipio,
        this.cod_division
      )
      this.updateJob(response.data)
    },
    async getFixme(data) {
      const response = await api.getFixme(this.cod_municipio, data)
      this.updateFixme(response.data)
    },
    async postFixme(data) {
      const response = await api.postFixme(this.cod_municipio, data)
      this.updateFixme(response.data)
    },
    async putFixme(data, config = {}) {
      const response = await api.putFixme(this.cod_municipio, data, config)
      this.updateFixme(response.data)
      return response.data
    },
    async deleteFixme() {
      await api.deleteFixme(this.cod_municipio)
      this.getJob(this.cod_municipio, this.cod_division)
    },
  },
})
