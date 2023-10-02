///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  it('Caixa "Qual o seu estado civil?"', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()
  
    //Teste36: Verificar se o campo está visível, habilitado e editável
    cy.get('#civilStatus').should('be.visible').should('not.be.disabled')
  
    //Teste37: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Selecione seu estado civil.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Selecione seu estado civil.')
  
    //Teste38: Verificar se é campo tipo seleção (Select)
  
  
    //Teste39: Verificar se a lista de opções é exibida ao clicar no campo
  
    //Teste40: Verificar se ao selecionar corretamente uma das opções da lista, nenhuma mensagem seja apresentada
    cy.get('#civilStatus').select('Casado(a)')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > .form--err > .validation-errors')
      .should('not.be.visible')
      .should('contain', 'Selecione seu estado civil.')
  })