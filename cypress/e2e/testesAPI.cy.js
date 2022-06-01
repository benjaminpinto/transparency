describe('Testes nos principais endpoints utilizados', () => {

  it('Verifica o ambiente (PRD/HML)', () => {
    cy.verificaEndpoint('../contaspublicasback/ambiente/verificaAmbiente')
      .its('body')
      .should('be.false')
  })

  it('Verifica a versão da aplicação', () => {
    cy.verificaEndpoint('../contaspublicasback/info/')
  })

  it('GET Execução Orçamentária e Financeira em Jan/Fev 2022', () => {
    cy.verificaEndpoint('../contaspublicasback/execucoesOF/ultimaatualizacao')
    cy.verificaEndpoint('../contaspublicasback/execucoesOF/?mes=2&ano=2022')
  })

  it('GET Licitações', () => {
    // var hoje = new Date()

    cy.verificaEndpoint('../contaspublicasback/licitacoes/modalidades')
    cy.verificaEndpoint('../contaspublicasback/licitacoes/situacoes')
    cy.verificaEndpoint(
      '../contaspublicasback/licitacoes/licitacoescomarquivos'
    )
    cy.verificaEndpoint('../contaspublicasback/licitacoes/ultimaatualizacao')
    cy.verificaEndpoint('../contaspublicasback/licitacoes/modalidades')
    cy.verificaEndpoint('../contaspublicasback/licitacoes/situacoes')
  })

  it('GET Licitações', () => {
    // var hoje = new Date()

    cy.verificaEndpoint('../contaspublicasback/atas/')
    cy.verificaEndpoint('../contaspublicasback/atas/ultimaatualizacao')
  })

  it('GET Instrumentos de Cooperação', () => {
    cy.verificaEndpoint('../contaspublicasback/instrumentos/')
    cy.verificaEndpoint('../contaspublicasback/instrumentos/ultimaatualizacao')
  })

  it('GET Atos de Dispensa/ Inexigibilidade', () => {
    cy.verificaEndpoint('../contaspublicasback/atos/')
    cy.verificaEndpoint('../contaspublicasback/atos/ultimaatualizacao')
  })
})
