describe('GUI tests at public transparency reports from trt13.jus.br', () => {
  beforeEach(() => {
    // Mocks genéricos
    const lastUpdate = '1653412349000'
    const info = '{"versao":"1.0.10"}'
    const environment = 'false' // {true: HML, false: PRD}

    cy.intercept('GET', '**/ultimaatualizacao', lastUpdate)
    cy.intercept('GET', '**/verificaAmbiente', environment)
    cy.intercept('GET', '**/info', info)

    cy.visit('/')
  })

  it('Check visibility of main items', () => {
    cy.get('.d-inline-block').should('be.visible')
    cy.get('.navbar-spacer').should('contain.text', 'Contas Públicas')
    cy.get('.mat-icon-button').should('be.visible')
    cy.get('.mat-button-wrapper > .mat-icon').should('be.visible')
  })

  context('Check reports opening, filters and buttons mocking API', () => {
    const month = 1
    const year = 2022

    it('Budget and Financial Execution', () => {
      cy.intercept('GET', '*/execucoesOF/?mes=*&ano=*', {
        fixture: 'itensEOF',
      }).as('getEOF')

      cy.abrirRelatorio('#/execucaoOF', 'Execução Orçamentária e Financeira')
      cy.get('h2').should('contain.text', 'Execução Orçamentária e Financeira')
      cy.get('#mat-select-value-23').should('not.be.empty')
      cy.get('#mat-select-value-25').should('not.be.empty')
      cy.get('#login').should('be.visible').and('be.enabled').click()
      cy.wait('@getEOF')
      cy.get('table[class*="mat-table"]').should('be.visible')
      cy.get('p[class*="ng-tns-c179-29"]').should('not.be.empty')

      // TODO Implement assert to check if report PDF is being generated
      cy.get('td.cdk-column-urlDocumentoPrograma').should('be.visible')
      cy.get('td.cdk-column-urlDocumentoNatureza').should('be.visible')
    })

    it('Bids', () => {
      cy.intercept('GET', '*/licitacoes/modalidades', {
        fixture: 'licitacaoModalidades',
      }).as('getLicitacoes')
      cy.intercept('GET', '*/licitacoes/situacoes', {
        fixture: 'licitacaoSituacoes',
      }).as('getLicitacoes')
      cy.intercept('GET', '*/licitacoes/licitacoescomarquivos', {
        fixture: 'licitacoesComArquivos',
      }).as('getLicitacoes')

      cy.abrirRelatorio('#/licitacao', 'Licitações')
      cy.wait('@getLicitacoes')
      cy.get('h2').should('contain.text', 'Licitações')
      cy.get('#mat-input-0').should('be.visible')
      cy.get('table[class*="mat-table"]').should(
        'contain.text',
        '2 registro(s) encontrado(s)'
      )
      // TODO Implement assert to check if report PDF is being generated
      cy.get('button[class*="btBaixar"]').should('be.visible').and('be.enabled')
      cy.get('#mat-input-0').type('9')
      cy.get('table[class*="mat-table"]').should(
        'contain.text',
        '1 registro(s) encontrado(s)'
      )
    })

    it('Minutes of Price Records', () => {
      cy.intercept('GET', '*/atas/', { fixture: 'atas' }).as('getAtas')

      cy.abrirRelatorio('#/atas', 'Atas de Registros de Preços')
      cy.wait('@getAtas')
      cy.get('h2').should('contain.text', 'Atas de Registros de Preços')
      cy.contains('8 registro(s) encontrado(s).')
      cy.get('#mat-input-0').should('be.visible').type(`${month}/${year}`)
      cy.contains('1 registro(s) encontrado(s).')
      cy.get('button[class*="btBaixar"]').should('be.visible').and('be.enabled')
      // TODO Implement assert to check if report PDF is being generated
    })

    it('Cooperation Instruments', () => {
      cy.intercept('GET', '*/instrumentos/', { fixture: 'instrumentos' }).as(
        'getInstrumentos'
      )

      cy.abrirRelatorio('#/instrumentoCooperacao', 'Instrumentos de Cooperação')
      cy.wait('@getInstrumentos')
      cy.get('h2').should('contain.text', 'Instrumentos de Cooperação')
      // TODO removes hardcoded values
      cy.get('#mat-input-0').should('be.visible').type('27440/2021')
      // TODO Implementar assert para verificar se o relatório está sendo gerado
      cy.get('button[class*="btBaixar"]').should('be.visible').and('be.enabled')
      cy.contains('1 registro(s) encontrado(s).')
    })

    it('Acts of Waiver/Unenforceability', () => {
      const ato = require('../fixtures/documentosAto')

      cy.intercept('GET', '*/atos/', { fixture: 'atos' }).as('getAtos')
      ato.forEach((element) => {
        cy.intercept(
          'GET',
          `*/atos/arquivos-sem-blob/${element.cod_ato}`,
          Array(element)
        )
      })

      cy.abrirRelatorio(
        '#/atosDispensaExigibilidade',
        'Atos de Dispensa/ Inexigibilidade'
      )
      cy.wait('@getAtos')
      cy.get('h2').should('contain.text', 'Atos de Dispensa/ Inexigibilidade')
      cy.contains('3 registro(s) encontrado(s)')
      cy.get('button[class*="btBaixar"]').should('be.visible').and('be.enabled')
      // TODO implement assert to check if report PDF is being generated
      cy.get('.licitacao-element-row a').should('be.visible').click()
      cy.contains('Processo: 963/2022').should('be.visible')
      cy.get('#mat-input-0').should('be.visible').type('963')
      cy.contains('1 registro(s) encontrado(s)').should('be.visible')
    })

    it('Purchases (Consumption)', () => {
      const comprasMesAno = require('../fixtures/comprasMesAno')

      cy.intercept('GET', `*/comprasconsumo/totalComprasAno?ano=${year}`, {
        fixture: 'totalComprasAno',
      }).as('comprasAno')
      cy.intercept('GET', `*/comprasconsumo/?mes=${month}&ano=${year}`, {
        fixture: 'comprasMesAno',
      }).as('comprasMesAno')

      cy.abrirRelatorio('#/comprasConsumo', 'Compras (Consumo)')
      cy.wait('@comprasAno')
      cy.get('h2').should('contain.text', 'Compras (Consumo)')
      cy.get('canvas').should('be.visible')
      cy.get('#mat-select-value-1').should('not.be.empty')
      cy.get('#mat-select-value-3').should('not.be.empty')
      cy.get('#login').should('be.visible').and('be.enabled').click()
      cy.wait('@comprasMesAno')
      cy.get('table[class*="mat-table"]').should('be.visible')
      cy.get('tr td table').should('have.length', comprasMesAno.length)
      cy.get('p[class*="ng-tns-c179-29"]').should('not.be.empty')
      cy.contains('Rolete fujitsu fi-6130/fi-6140').should('not.be.visible')
      // FIXME Investigate why this test fails
      // cy.get('a[tabindex="0"]').eq(0).parent().click()
      // cy.contains('Rolete fujitsu fi-6130/fi-6140').should('be.visible')
    })

    it('Funds Supply', () => {
      const suprimentos = require('../fixtures/suprimentos')

      cy.intercept('GET', `**/suprimentos/?ano=${year}`, {
        fixture: 'suprimentos',
      }).as('suprimentos')
      cy.abrirRelatorio('#/suprimentofundos', 'Suprimento de Fundos')
      cy.wait('@suprimentos')
      cy.get('mat-select').should('not.be.empty')
      cy.get('#pesquisar').should('be.visible').and('be.enabled').click()
      cy.get('table[class*="mat-table"]').should('be.visible')
      cy.get('tbody tr').should('have.length', suprimentos.length)
    })

    it('Purchases (Permanent)', () => {
      const compras = require('../fixtures/comprasPermanente')

      cy.intercept('GET', `**/compraspermanente/?mes=${month}&ano=${year}`, {
        fixture: 'comprasPermanente',
      }).as('comprasPermanente')
      cy.abrirRelatorio('#/comprasPermanente', 'Compras (Permanente)')
      cy.get('h2').should('contain.text', 'Compras (Permanente)')
      cy.get('#mat-select-value-1').should('not.be.empty')
      cy.get('#mat-select-value-3').should('not.be.empty')
      cy.get('#login').should('be.visible').and('be.enabled').click()
      cy.wait('@comprasPermanente')
      cy.get('table[class*="mat-table"]').should('be.visible')
      cy.get('tbody tr').should('have.length', compras.length)
      cy.get('p[class*="ng-tns-c179-29"]').should('not.be.empty')
    })
    it('Subsistence allowance', () => {
      const ajudaCusto = require('../fixtures/ajudaDeCusto')
      cy.intercept('GET', `**/ajudadecusto/${year - 1}`, {
        fixture: 'ajudaDeCusto',
      }).as('ajudaDeCusto')
      cy.abrirRelatorio('#/ajudaCusto', 'Ajuda de Custo')
      cy.get('h2').should('contain.text', 'Ajuda de Custo')
      cy.get('#mat-select-value-3').should('not.be.empty')
      cy.get('#login').should('be.visible').and('be.enabled').click()
      cy.wait('@ajudaDeCusto')
      cy.get('button.mat-focus-indicator')
        .should('be.visible')
        .and('be.enabled')
      cy.get('table[class*="mat-table"]').should('be.visible')
      cy.get('tbody tr').should('have.length', 5) // paginação = 5
      cy.get('p[class*="ng-tns-c179-29"]').should('not.be.empty')
    })
  })
})
