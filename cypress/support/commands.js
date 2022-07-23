/* eslint-disable no-undef */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
  const login = require('../fixtures/login.json')
  localStorage.setItem('token', login.session_token)
  localStorage.setItem('username', login.username)
  localStorage.setItem('osmId', login.osm_id)
  cy.intercept('PUT', '/login', {
    statusCode: 200,
    body: 'Ok',
  })
})

Cypress.Commands.add('selectMunicipio', () => {
  localStorage.setItem('municipio', '02001')
  cy.intercept('/prov', { fixture: 'provincias.json' })
  cy.intercept('/prov/02', { fixture: 'prov.02.json' })
  cy.intercept('/mun/02001', { fixture: 'mun.02001.json' })
})
