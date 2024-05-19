import axios from 'axios'
import { useFlashStore } from '@/stores/flash'

export const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: true,
  timeout: 60000,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    useFlashStore().set(error)
    return Promise.reject(error)
  }
)

api.getUser = () => {
  return api.get('user')
}

api.getProv = (prov) => {
  const url = prov ? 'prov/' + prov : 'prov'
  return api.get(url)
}

api.getMun = (mun) => {
  return api.get('mun/' + mun)
}

api.getJobs = () => api.get('job')

api.getJob = (cod_municipio, cod_division, params) => {
  const div = cod_division || ''
  return api.get('job/' + (cod_municipio || '') + '/' + div, { params })
}

api.postJob = (cod_municipio, cod_division, options) => {
  const div = cod_division || ''
  return api.post('job/' + cod_municipio + '/' + div, options)
}

api.deleteJob = (cod_municipio, cod_division, params = {}) => {
  const div = cod_division || ''
  return api.delete('job/' + cod_municipio + '/' + div, { params })
}

api.getHgw = (cod_municipio, street) => {
  return api.get('hgw/' + cod_municipio, { params: { street } })
}

api.putHgw = (cod_municipio, data) => {
  return api.put('hgw/' + cod_municipio, data)
}

api.postHgw = (cod_municipio, data) => {
  return api.post('hgw/' + cod_municipio, data)
}

api.getFixme = (cod_municipio, cod_division, fixme) => {
  const div = cod_division || ''
  return api.get('fixme/' + cod_municipio + '/' + div, { params: { fixme } })
}

api.postFixme = (cod_municipio, cod_division, fixme) => {
  const div = cod_division || ''
  return api.post('fixme/' + cod_municipio + '/' + div, { fixme })
}

api.putFixme = (cod_municipio, cod_division, data, config) => {
  const div = cod_division || ''
  return api.put('fixme/' + cod_municipio + '/' + div, data, config)
}

api.deleteFixme = (cod_municipio, cod_division) => {
  const div = cod_division || ''
  return api.delete('fixme/' + cod_municipio + '/' + div)
}

api.getExport = (cod_municipio) => {
  return api.get('export/' + cod_municipio)
}

export default api
