///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  
  it('Caixa “Qual o seu CPF"', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()
  
    //Teste31: Verificar se o campo está visível, habilitado e editável
    cy.get('#personalNumber').should('be.visible').should('not.be.disabled')
  
    //Teste32: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Digite o número do seu CPF.”
    cy.get('#buttonCompare').click()
    cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Digite o número do seu CPF.')
  
    //Teste33: Verificar se são aceitos apenas caracteres do tipo numérico
    cy.get('#personalNumber').type('ABC123@#$')
  
    //Teste34: Verificar se o preenchimento com CPF inválido, uma mensagem seja apresentada
    cy.get('#personalNumber').clear()
    cy.get('#personalNumber').type('99999999999')
    cy.get('#buttonCompare').click()
    cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Digite o número do seu CPF.')
  
    //Teste35: Verificar se ao preencher corretamente o campo, nenhuma mensagem seja apresentada
    cy.get('#personalNumber').clear()
    cy.get('#personalNumber').type('70404688080')
    cy.get('#buttonCompare').click()
    cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors').should('not.be.visible')
})