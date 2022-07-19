/* eslint-disable no-undef */
describe('Login', () => {
  it('Redirect to home if not logged', () => {
    cy.visit('/')
    cy.contains('Importación del Catastro Español a OpenStreetMap')
  })
  it('Start loggin process', () => {
    const params = '?oauth_token=foo&oauth_verifier=bar'
    cy.intercept('http://localhost:5001/login?callback=*', (req) => {
      req.continue((res) => {
        expect(res.headers.location).to.include('oauth_callback=')
        expect(res.statusCode).to.equal(302)
        let callback = res.headers.location.match(/oauth_callback=([^&]+)&?/)[1]
        callback = callback + params
        res.headers.location = decodeURIComponent(callback)
      })
    })
    cy.intercept('/authorize' + params, { fixture: 'login.json' })
    cy.get('[data-target="topNav"').click()
    cy.get('[data-test="login"').click()
    cy.get('[data-test="logout"').should('exist')
    cy.get('[data-test="user"]').should('contain', 'Indiana Jones')
    cy.get('[data-test="provincia"]').should('be.visible')
  })
})
