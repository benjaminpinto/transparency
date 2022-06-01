Cypress.Commands.add('abrirRelatorio', (href, titulo) => {
  cy.get('.mat-icon-button > .mat-button-wrapper > .mat-icon').click()
  cy.get(`a[href="${href}"]`).click()
})
