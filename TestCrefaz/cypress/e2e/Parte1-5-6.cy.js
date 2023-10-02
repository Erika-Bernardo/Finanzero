///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Qual o seu celular?”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste52: Verificar se o campo está visível, habilitado e editável
    cy.get('#telephoneNumber').should('be.visible').should('not.be.disabled')

    //Teste53: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Digite um número de celular com DDD: (xx) 9xxxx-xxxx.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(5) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite um número de celular com DDD: (xx) 9xxxx-xxxx.')

    //Teste54: Verificar se são aceitos apenas caracteres do tipo numérico

    //Teste55: Verificar se o preenchimento com um número com menos de 11 caracteres ou que não se inicie com 9, uma mensagem seja apresentada
    cy.get('#telephoneNumber').clear()
    cy.get('#telephoneNumber').type('99199999999')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(5) > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite um número de celular com DDD: (xx) 9xxxx-xxxx.')

    //Teste56: Verificar se ao preencher corretamente o campo, nenhuma mensagem seja apresentada
    cy.get('#telephoneNumber').clear()
    cy.get('#telephoneNumber').type('44999999999')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(5) > .form--err > .validation-errors').should('not.be.visible')
})