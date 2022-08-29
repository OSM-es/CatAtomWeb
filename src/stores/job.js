var array = require('lodash/array')
import { defineStore } from 'pinia'
import { useProvStore } from '@/stores/provincias'
import api from '@/services/api'

export const useJobStore = defineStore({
  id: 'job',
  state: () => ({
    cod_municipio: null,
    cod_division: null,
    edificios: true,
    direcciones: true,
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
    current_args: '',
    type: '',
    parcel_parts: Number(process.env.VUE_APP_DEFAULT_PARCEL_PARTS),
    parcel_dist: Number(process.env.VUE_APP_DEFAULT_PARCEL_DIST),
  }),

  getters: {
    provincia: (state) => state.cod_municipio.substring(0, 2),
    nombreZona: (state) => {
      const provincias = useProvStore()
      let name = state.report.split_name
      name = name ? name + ', ' : ''
      name = name + state.report.mun_name
      let prov = provincias.nombre(state.report.mun_code)
      name = prov != state.report.mun_name ? name + ' (' + prov + ')' : name
      return name
    },
    options: (state) => {
      return state.edificios ? (state.direcciones ? 'bd' : 'b') : 'd'
    },
    fixmes: (state) => {
      return state.revisar.filter((fixme) => fixme.fixmes != '0').length
    },
    highways: (state) => {
      return state.callejero.reduce(
        (total, row) => total + (row.length < 3 || !row[2] ? 1 : 0),
        0
      )
    },
    nextMsg: (state) => {
      if (state.type == 'd') {
        return 'Process buildings'
      }
      if (state.type == 'b') {
        return 'Process addresses'
      }
      return ''
    },
    url: (state) => {
      const split = state.cod_division ? `/${state.cod_division}` : ''
      const tasks = state.current_args || ''
      return `results/${state.cod_municipio}${split}/tasks${tasks}`
    },
    link: (state) => {
      const div = state.cod_division
      return state.cod_municipio + (div ? `/${div}` : '')
    }
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
        this.idioma = 'es_ES'
        if (provincias.ca_provs.includes(this.provincia)) {
          this.idioma = 'ca_ES'
        } else if (provincias.gl_provs.includes(this.provincia)) {
          this.idioma = 'gl_ES'
        }
      } else {
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
      this.callejero[i] = [
        data.cat,
        data.conv,
        data.src,
        data.osm_id,
        data.username,
      ]
    },
    updateFixme(data) {
      const i = array.findIndex(this.revisar, { filename: data.filename })
      this.revisar[i] = data
    },
    async getJob(cod_municipio, cod_division, force = false) {
      if (cod_municipio) {
        const linea = this.estado == 'RUNNING' ? this.linea : 0
        const params = { linea }
        if (this.estado == 'RUNNING' || force) {
          params.building = this.edificios
          params.address = this.direcciones
        }
        const response = await api.getJob(cod_municipio, cod_division, params)
        this.updateJob(response.data)
      }
    },
    async createJob() {
      const options = {
        building: this.edificios,
        address: this.direcciones,
        config: {
          language: this.idioma,
          parcel_parts: this.parcel_parts,
          parcel_dist: this.parcel_dist,
        },
      }
      const mun = this.cod_municipio
      const div = this.cod_division
      const response = await api.postJob(mun, div, options)
      this.estado = response.data.estado
      this.mensaje = response.data.mensaje
      return response
    },
    async deleteJob() {
      const options = { building: this.edificios, address: this.direcciones }
      const response = await api.deleteJob(
        this.cod_municipio,
        this.cod_division,
        options
      )
      this.updateJob(response.data)
    },
    async getFixme(data) {
      const response = await api.getFixme(
        this.cod_municipio,
        this.cod_division,
        data
      )
      this.updateFixme(response.data)
    },
    async postFixme(data) {
      const response = await api.postFixme(
        this.cod_municipio,
        this.cod_division,
        data
      )
      this.updateFixme(response.data)
    },
    async putFixme(data, config = {}) {
      const response = await api.putFixme(
        this.cod_municipio,
        this.cod_division,
        data,
        config
      )
      this.updateFixme(response.data)
      return response.data
    },
    async deleteFixme() {
      const response = await api.deleteFixme(
        this.cod_municipio,
        this.cod_division
      )
      this.updateJob(response.data)
    },
  },
})
