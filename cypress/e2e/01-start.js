/// <reference types="cypress" />
import useUtils from "/cypress/support/useUtils";


// === Data ===
const title = 'Home v3'


// === Support Functions ===
const utils = useUtils();


// === Available Tests ===
const availableTests = {
  background: {
    test: () => {
      // === Background should be blank ===
      cy.get('.main-content-with-background')
        .as('divWithBackground')
        .should('have.css', 'background-image')
        .and('include', '/img/background/blank.png')


      // Note: Must be the first image starting with the letter
      const backgroundImage = 'landscape-1.webp'
      // Note: wait is necessary for dropdown to fully render
      cy.wait(500)
        .then(_ => {
          // Select image starting with c(andles)
          cy.get('[data-test=dropdown-background-chooser]').trigger('mousedown').type(backgroundImage[0])
          cy.get('@divWithBackground')
            .should('have.css', 'background-image')
            .and('include', `/img/background/${backgroundImage}`)
        })
    },
    title: 'Background',
  },
  buttons: {
    test: () => {
      // === Start and Reset buttons should be on Home page ===
      cy.contains('button', 'Start')
      cy.contains('button', 'Reset')

      // === Save button should not appear until Set Timer is clicked ===
      cy.contains('button', 'Save').should('not.exist')

      cy.wait(500)
        .then(_ => {
          // === Set Timer should exist, click on it to bring up Save button ===
          cy.contains('button', 'Set Timer').should('exist').click()

          // === Save button should now be visible ===
          cy.contains('button', 'Save')
        })

    },
    // title: 'Buttons',
  },
}


describe(title, () => {
  beforeEach(() => {
    cy.visit('/')
  })

  // === Run tests with `shouldRun` set to true
  utils.runTests(availableTests)
})
