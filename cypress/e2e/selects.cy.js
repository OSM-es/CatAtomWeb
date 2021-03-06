/* eslint-disable no-undef */
beforeEach(() => {
  cy.login()
  cy.intercept('/prov', { fixture: 'provincias.json' })
  cy.intercept('/prov/38', { fixture: 'prov.38.json' })
  cy.intercept('/mun/38900', { fixture: 'mun.38900.json' })
  cy.intercept('/job/38900', { fixture: 'job.38900.available.json' })
})

describe('Selects', () => {
  it('Select provincia', () => {
    cy.visit('/')
    cy.get('[data-test="provincia"]').click()
    cy.get('[data-test="provincia"]').type('38{enter}')
    cy.get('[data-test="provincia"]').should(
      'contain',
      '38 Santa Cruz de Tenerife'
    )
  })
  it('Select municipio', () => {
    cy.get('[data-test="municipio"]').click()
    cy.get('[data-test="municipio"]').type('38900{enter}')
    cy.get('[data-test="municipio"]').should(
      'contain',
      '38900 Santa Cruz de Tenerife',
    )
    cy.get('[data-test="processPanel"]').should('be.visible')
    cy.get('[data-test="processPanel"]').should('have.class', 'is-info')
    cy.get('[data-test="estado"]').should('have.text', 'No procesado')
  })
  it('Select division', () => {
    cy.get('[data-test="division"]').click()
    cy.get('[data-test="division"]').should('contain', 'Distrito Anaga')
    cy.get('[data-test="division"]').should('contain', 'Distrito Centro-Ifara')
    cy.get('[data-test="division"]').should('contain', 'Distrito Ofra-Costa Sur')
    cy.get('[data-test="division"]').should('contain', 'Distrito Salud-La Salle')
    cy.get('[data-test="division"]').should('contain', 'Distrito Suroeste')
    cy.get('[data-test="division"]').should('contain', 'Barrio La Salud')
    cy.get('[data-test="division"]').type('ofra{enter}')
    cy.get('[data-test="division"]').should('contain', 'Distrito Ofra-Costa Sur')
    cy.get('[data-test="division"]').should('not.contain', 'Distrito Anaga')
  })
})

after('Save municipio', () => {
  expect(localStorage.getItem('municipio')).equal('38900')
})
