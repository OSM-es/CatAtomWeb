/* eslint-disable no-undef */
module.exports = {
  defaults: {
    headers: {
      common: {
        Authorization: 'token',
      },
    },
  },
  getAuth: jest.fn((session) => {
    if (session == 'oauth_token=qcu2SF') {
      return Promise.resolve({
        data: {
          session_token: 'nekot',
          username: 'raboof',
          osm_id: '321',
          session: session,
        },
      })
    }
    return Promise.resolve({ data: {} })
  }),
  setAuth: jest.fn(),
  getProv: jest.fn((prov) => {
    if (prov) {
      return {}
    } else {
      return { data: require('../../fixtures/prov.json') }
    }
  }),
  getJob: jest.fn((cod_municipio) => ({
    data: {
      cod_municipio,
      estado: 'AVAILABLE',
    },
  })),
  postJob: jest.fn((cod_municipio, cod_division,    options) => {
    let report = { language: options.idioma }
    if ('building' in options) {
      report['building_date'] = '1999'
    }
    if ('address' in options) {
      report['address_date'] = '1999'
    }
    return {
      data: {
        cod_municipio,
        cod_division,
        estado: 'RUNNING',
        mensaje: 'lorem ipsum',
        report,
      },
    }
  }),
  deleteJob: jest.fn((cod_municipio) => ({
    data: {
      cod_municipio,
      estado: 'AVAILABLE',
      mensaje: 'eliminado',
    },
  })),
  putHgw: jest.fn((cod_municipio, data) => ({
    data: { ...data, osm_id: 'foo', username: 'bar' },
  })),
  putFixme: jest.fn((cod_municipio, cod_division, filename) => ({
    data: {
      filename: filename,
      fixmes: '0',
      osm_id: 'foo',
      username: 'bar',
    },
  })),
  postFixme: jest.fn((cod_municipio, cod_division, filename) => ({
    data: {
      filename: filename,
      fixmes: '0',
      osm_id: 'foo',
      username: 'bar',
      locked: 'true',
    },
  })),
  deleteFixme: jest.fn(),
}
