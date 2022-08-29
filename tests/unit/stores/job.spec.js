/* eslint-disable no-undef */
import { setActivePinia, createPinia } from 'pinia'
import { useJobStore } from '@/stores/job'
import api from '@/services/api'
jest.mock('@/services/i18n', () => require('../../mocks/services/i18n'))
jest.mock('@/services/api', () => require('../../mocks/services/api'))

let job

beforeEach(() => {
  setActivePinia(createPinia())
  job = useJobStore()
})

test('getJob 02001', async () => {
  await job.getJob('02001')
  expect(job.cod_municipio).toBe('02001')
  expect(job.estado).toBe('AVAILABLE')
  expect(job.idioma).toBe('es_ES')
  expect(job.informe).toEqual([])
  expect(job.log).toEqual([])
})

test('getJob 03002', async () => {
  await job.getJob('03002')
  expect(job.cod_municipio).toBe('03002')
  expect(job.estado).toBe('AVAILABLE')
  expect(job.idioma).toBe('ca_ES')
})

test('getJob 02001 running', async () => {
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/02001.running.0.json'),
  }))
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/02001.running.3.json'),
  }))
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/02001.running.7.json'),
  }))
  await job.getJob('02001')
  expect(job.linea).toBe(0)
  expect(job.log.length).toBe(0)
  await job.getJob('02001')
  expect(job.linea).toBe(3)
  expect(job.log.length).toBe(3)
  await job.getJob('02001')
  expect(job.linea).toBe(7)
  expect(job.log.length).toBe(7)
})

test('getJob 03002 review', async () => {
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/03002.review.json'),
  }))
  await job.getJob('03002')
  expect(job.cod_municipio).toBe('03002')
  expect(job.estado).toBe('REVIEW')
  expect(job.idioma).toBe('ca_ES')
})

test('createJob 02001', async () => {
  job.cod_municipio = '02001'
  job.cod_division = 'foo'
  job.edificios = true
  job.direcciones = false
  job.idioma = 'ca_ES'
  await job.createJob()
  expect(job.cod_municipio).toBe('02001')
  expect(job.cod_division).toBe('foo')
  expect(job.estado).toBe('RUNNING')
  expect(job.idioma).toBe('ca_ES')
  expect(job.mensaje).toBe('lorem ipsum')
})

test('deleteJob 02001', async () => {
  job.cod_municipio = '02001'
  await job.deleteJob()
  expect(job.mensaje).toBe('eliminado')
})

test('updateHighway 03002', async () => {
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/03002.review.json'),
  }))
  await job.getJob('03002')
  const data = {
    cat: 'CL CARMELITA LA',
    conv: 'Calle la Carmelita',
    osm_id: 'foo',
    username: 'bar',
  }
  job.updateHighway(data)
  expect(job.callejero[7][1]).toBe('Calle la Carmelita')
  expect(job.callejero[7][3]).toBe('foo')
  expect(job.callejero[7][4]).toBe('bar')
})

test('putHighway 03002', async () => {
  const resp = require('../../fixtures/03002.review.json')
  job.updateJob(resp)
  await job.putHighway('CL CARMELITA LA', 'Calle la Carmelita')
  expect(job.callejero[7][1]).toBe('Calle la Carmelita')
  expect(job.callejero[7][3]).toBe('foo')
  expect(job.callejero[7][4]).toBe('bar')
})

test('updateFixme 02001', async () => {
  api.getJob.mockImplementationOnce(() => ({
    data: require('../../fixtures/02001.fixme.json'),
  }))
  await job.getJob('02001')
  const data = { filename: '5913028XJ2451S.osm.gz', fixmes: '0', osm_id: 'foo' }
  expect(job.revisar[2].filename).toBe(data.filename)
  expect(job.revisar[2].fixmes).toBe('1')
  expect(job.revisar[2].osm_id).toBeNull()
  job.updateFixme(data)
  expect(job.revisar[2].fixmes).toBe('0')
  expect(job.revisar[2].osm_id).toBe('foo')
})

test('putFixme 02001', async () => {
  const resp = require('../../fixtures/02001.fixme.json')
  job.updateJob(resp)
  await job.putFixme('5914018XJ2451S.osm.gz')
  expect(job.revisar[3].filename).toBe('5914018XJ2451S.osm.gz')
  expect(job.revisar[3].fixmes).toBe('0')
  expect(job.revisar[3].osm_id).toBe('foo')
  expect(job.revisar[3].locked).not.toBe('true')
})

test('postFixme 02001', async () => {
  const resp = require('../../fixtures/02001.fixme.json')
  job.updateJob(resp)
  await job.postFixme('5914018XJ2451S.osm.gz')
  expect(job.revisar[3].filename).toBe('5914018XJ2451S.osm.gz')
  expect(job.revisar[3].fixmes).toBe('0')
  expect(job.revisar[3].osm_id).toBe('foo')
  expect(job.revisar[3].locked).toBe('true')
})
