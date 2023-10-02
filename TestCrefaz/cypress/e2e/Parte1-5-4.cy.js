///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Quando você nasceu?”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste41: Verificar se os campos de Dia, Mês e Ano, estão visíveis, habilitados e editáveis
    cy.get('#DD_birthDate').should('be.visible').should('not.be.disabled')
    cy.get('#MM_birthDate').should('be.visible').should('not.be.disabled')
    cy.get('#YY_birthDate').should('be.visible').should('not.be.disabled')

    //Teste42: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida ”Selecione sua data de nascimento.”’
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(3) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Selecione sua data de nascimento.')

    //Teste43: Verificar se é campo tipo seleção (Select)

    //Teste44: Verificar se a lista de opções é exibida ao clicar no campo

    //Teste45: Verificar se o não preenchimento de um ou mais campos, uma mensagem seja apresentada
    cy.get('#DD_birthDate').select('1')
    cy.get('#MM_birthDate').select('10')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(3) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Selecione sua data de nascimento.')

    //Teste46: Verificar se ao selecionar corretamente uma das opções da lista, nenhuma mensagem seja apresentada
    cy.get('#YY_birthDate').select('1988')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(3) > .form--err > .validation-errors')
        .should('not.be.visible')
        .should('contain', 'Selecione sua data de nascimento.')
})