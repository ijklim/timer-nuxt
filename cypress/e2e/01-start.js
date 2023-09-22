/// <reference types="cypress" />

describe('Root', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Buttons', () => {
    cy.contains('button', 'Set Timer')
    cy.contains('button', 'Start')
    cy.contains('button', 'Reset')
  })
})
