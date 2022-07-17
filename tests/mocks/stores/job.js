/* eslint-disable no-undef */
let job = {
  participantes: 0,
  charla: [],
  cod_municipio: '12345',
  propietario: { osm_id: '321' },
  postFixme: jest.fn(),
  updateFixme: jest.fn(),
  putFixme: (data) => Promise.resolve(data),
}

module.exports = {
  useJobStore: () => job,
}
