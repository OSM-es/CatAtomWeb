/* eslint-disable no-undef */
beforeEach(() => {
  const params = '?oauth_token=foo&oauth_verifier=bar'
  cy.intercept('http://localhost:5001/login?callback=*', (req) => {
    req.continue((res) => {
      let callback = res.headers.location.match(/oauth_callback=([^&]+)&?/)[1]
      callback = callback + params
      res.headers.location = decodeURIComponent(callback)
    })
  })
  cy.intercept('/authorize' + params, { fixture: 'login.json' })
})

describe('Login', () => {
  it('Redirect to home if not logged', () => {
    cy.visit('/')
    cy.contains('Importación del Catastro Español a OpenStreetMap')
  })
  it('Start loggin process', () => {
    cy.get('[data-target="topNav"').click()
    cy.get('[data-test="login"').click()
    cy.get('[data-test="logout"').should('exist')
    cy.get('[data-test="user"]').should('have.text', 'Indiana Jones')
    cy.get('[data-test="provincia"]').should('be.visible')
  })
})
