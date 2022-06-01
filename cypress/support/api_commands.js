Cypress.Commands.add('verificaEndpoint', (url) => {
    cy.request(url)
        .should((response) => {
            expect(response.status).be.eq(200)
            expect(response.body).not.null
        })
})