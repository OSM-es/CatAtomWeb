/* eslint-disable no-undef */
let job = {
  participantes: 0,
  charla: [],
  cod_municipio: '12345',
  revisar: [],
  fixmes: 0,
  propietario: { osm_id: '321' },
  getFixme: jest.fn(),
  postFixme: jest.fn(),
  updateFixme: jest.fn(),
  url: 'results/12345/tasks',
putFixme: (data) => Promise.resolve(data),
}

module.exports = {
  useJobStore: () => job,
}
