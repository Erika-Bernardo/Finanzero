///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Qual a sua ocupação?”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste47: Verificar se o campo está visível, habilitado e editável
    cy.get('#workStatus').should('be.visible').should('not.be.disabled')

    //Teste48: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida ‘’Selecione sua ocupação principal.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(4) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Selecione sua ocupação principal.')

    //Teste51: Verificar se ao selecionar corretamente uma das opções da lista, nenhuma mensagem seja apresentada
    cy.get('#workStatus').select('Desempregado')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(4) > .form--err > .validation-errors')
        .should('not.be.visible')
        .should('contain', 'Selecione sua ocupação principal.')
})