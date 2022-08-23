import axios from 'axios'
import { useErrorStore } from '@/stores/error'

export const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  withCredentials: true,
  timeout: 60000,
})

api.setAuth = () => {
  const token = localStorage.getItem('token')

  if (token) {
    api.defaults.headers.common['Authorization'] = `token ${token}`
  }
}

api.setAuth()

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    useErrorStore().set(error)
    return Promise.reject(error)
  }
)

api.getAuth = (session) => {
  return api.get('authorize', { params: session })
}

api.getProv = (prov) => {
  const url = prov ? 'prov/' + prov : 'prov'
  return api.get(url)
}

api.getMun = (mun) => {
  return api.get('mun/' + mun)
}

api.getJob = (cod_municipio, cod_division, linea = 0) => {
  const params = { linea }
  const div = cod_division || ''
  return api.get('job/' + (cod_municipio || '') + '/' + div, { params })
}

api.postJob = (cod_municipio, cod_division, options) => {
  const div = cod_division || ''
  return api.post('job/' + cod_municipio + '/' + div, options)
}

api.deleteJob = (cod_municipio, cod_division) => {
  const div = cod_division || ''
  return api.delete('job/' + cod_municipio + '/' + div)
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

api.getFixme = (cod_municipio, fixme) => {
  return api.get('fixme/' + cod_municipio, { params: { fixme } })
}

api.postFixme = (cod_municipio, fixme) => {
  return api.post('fixme/' + cod_municipio, { fixme })
}

api.putFixme = (cod_municipio, data, config) => {
  return api.put('fixme/' + cod_municipio, data, config)
}

api.deleteFixme = (cod_municipio, cod_division) => {
  const div = cod_division || ''
  return api.delete('fixme/' + cod_municipio + '/' + div)
}

api.getExport = (cod_municipio) => {
  return api.get('export/' + cod_municipio)
}

export default api
