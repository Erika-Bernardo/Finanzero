///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
context('Anonymous', () => {

    it('Botão "COMPARAR REFINANCIAMENTO"', () => {
        cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
        cy.get('.def-sf-secondary').click()
        cy.get('.def-mr-gutter > .def-sf-clickable').click()
        cy.get('.def-ml-gutter > .def-sf-clickable').click()
        cy.get('#loanPeriodInMonths > :nth-child(3)')
        cy.get('#loanPeriodInMonths > :nth-child(1)').click()
        cy.get('.def-sf-secondary').click()

        //Teste62: Verificar se o botão está visível e habilitado para clique
        cy.get('#buttonCompare').should('be.visible').should('not.be.disabled')

        //Teste64: Verificar se após preenchimento de todos os campos obrigatórios na tela de “ peça uma cotação grátis!”, ao clicar no botão “COMPARAR REFINANCIAMENTO” seja redirecionado para a tela de “Passo2”, “Precisamos saber mais um pouquinho sobre você”, caso você tenha respondido “SIM” na tela  “Deseja usar seu veículo como garantia”. Caso tenha respondido “NÃO” nessa tela, você será redimensionado para a tela de “Dados Complementares”, “Precisamos saber mais um pouquinho sobre você”
        cy.get('#fullName').type('gsgsg hgtsa')
        cy.get('#personalNumber').type('973.378.540-72')
        cy.get('#civilStatus').select('Casado(a)')
        cy.get('#DD_birthDate').select('28')
        cy.get('#MM_birthDate').select('10')
        cy.get('#YY_birthDate').select('1948')
        cy.get('#workStatus').select('Desempregado')
        cy.get('#telephoneNumber').type('44988748418')
        cy.get('#email').type('joao@hgagaggag.com')
        cy.get('#buttonCompare').click()
        cy.get('.form--title')
            .should('be.visible')
            .should('contain', 'Precisamos saber mais um pouquinho sobre você')

    })
})