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
}
