///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa "Qual o seu e-mail?"', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste57: Verificar se o campo está visível, habilitado e editável
    cy.get('#email').should('be.visible').should('not.be.disabled')

    //Teste58: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Digite um e-mail válido.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(6) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite um e-mail válido')

    //Teste59: Verificar se são aceitos caracteres do tipo texto
    cy.get('#email').type('aBc1258#$%')

    //Teste60: Verificar se ao não preencher corretamente o e-mail, uma mensagem é exibida corretamente, e o campo seja limpo
    cy.get('#email').clear()
    cy.get('#email').type('joao@com')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(6) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite um e-mail válido')

    //Teste61: Verificar se ao preencher corretamente o campo, nenhuma mensagem seja apresentada
    cy.get('#email').clear()
    cy.get('#email').type('joao@maria.com')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(6) > .form--err > .validation-errors').expect($nonexistent).not.to.exist
}) 