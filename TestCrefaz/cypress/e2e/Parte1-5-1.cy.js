///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Qual o seu nome completo? (igual ao RG)”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()


    //Teste25: Verificar se o campo está visível, habilitado e editável
    cy.get('#fullName').should('be.visible').should('not.be.disabled')

    //Teste26: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Digite seu nome completo como está no RG.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > :nth-child(1) > .form--group > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite seu nome completo como está no RG.')

    //Teste27: Verificar se são aceitos caracteres do tipo texto
    cy.get('#fullName').type('ABC123@#$')

    //Teste28: Verificar se o preenchimento com menos de 2 nomes não é aceito, apresentando a mensagem
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > :nth-child(1) > .form--group > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite seu nome completo como está no RG.')

    //Teste29: Verificar se ao preencher com caracteres numéricos ou especiais, a mensagem é exibida corretamente.
    cy.get('#fullName').clear()
    cy.get('#fullName').type('123 @#$ HAI')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > :nth-child(1) > .form--group > .form--err > .validation-errors')
        .should('be.visible')
        .should('contain', 'Digite seu nome completo como está no RG.')

    //Teste30: Verificar se ao preencher corretamente o campo, nenhuma  mensagem seja apresentada;
    cy.get('#fullName').clear()
    cy.get('#fullName').type('empresa crefaz')
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > :nth-child(1) > .form--group > .form--err > .validation-errors')
        .should('not.be.visible')
        .should('contain', 'Digite seu nome completo como está no RG.')
})