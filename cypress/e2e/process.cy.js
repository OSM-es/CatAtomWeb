/* eslint-disable no-undef */
let state = ''

beforeEach(() => {
  cy.login()
  cy.selectMunicipio()
  cy.intercept('GET', '/job/02001/?*', (req) => {
    if (!state) {
      state = 'available'
    } else if (state == 'available') {
      state = 'running.0'
    } else if (state == 'running.0') {
      state = 'running.1'
    } else if (state == 'running.1') {
      state = 'review.0'
    }
    const fix = `job.02001.${state}.json`
    req.reply({ fixture: fix })
  }).as('getjob')
  cy.intercept('POST', 'job/02001', (req) => {
    expect(req.body.building).to.be.false
    expect(req.body.idioma).to.be.equal('ca_ES')
    req.reply({ fixture: 'job.02001.post.json' })
  })
})

describe('Create process', () => {
  it('Create process', () => {
    cy.visit('/')
    cy.wait('@getjob').then(() => {
      cy.get('[data-test="division"] input').should('be.disabled')
      cy.get('[data-test="edificios"]').click()
      cy.get('[data-test="idioma"]').select('ca_ES')
      cy.contains('button', 'Procesar').click()
      cy.wait('@getjob').then(() => {
        const log = cy.get('[data-test="log"]')
        log.should('be.visible')
        log.should('have.class', 'is-info')
        cy.wait('@getjob').then(() => {
          const log = cy.get('[data-test="log"]')
          log.find('[class="terminal"]').should('have.length', 3)
          log.get('[class="loader"').should('be.visible')
          cy.wait('@getjob').then(() => {
            const review = cy.get('[data-test="review"]')
            review.should('be.visible')
            review.should('have.class', 'is-info')
            const report = cy.get('[data-test="report"]')
            report.find('[class="terminal"]').should('have.length', 53)
            const log = cy.get('[data-test="log"]')
            log.find('[class="terminal"]').should('have.length', 5)
          })
        })
      })
    })
  })
})
