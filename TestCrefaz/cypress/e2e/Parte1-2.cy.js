///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Sua renda é maior que 3 mil reais?”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=rendaMensal')
    cy.get('.def-sf-secondary').click()

    //Teste8: Verificar se os botões "SIM" e "NÃO" estão visíveis na caixa de pergunta, se estão habilitados para clique
    cy.get('.def-mr-gutter > .def-sf-clickable').should('be.visible').should('not.be.disabled')
    cy.get('.def-ml-gutter > .def-sf-clickable').should('be.visible').should('not.be.disabled')

    //Teste9: Verificar se o campo "< Voltar" está disponível e habilitado para clique'    
    cy.get('.def-t-clickable > p')
        .should('be.visible')
        .should('not.be.disabled')

    //Teste10: Verificar se ao clicar no botão "SIM" é redirecionado para nova caixa com o campo de "Você possui veículo quitado em seu nome?"
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=hasVehicle')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Você possui veículo quitado em seu nome?')
    cy.get('.def-t-clickable > p').click()

    //Teste11: Verificar se ao clicar no botão "NÃO" é redirecionado para nova caixa com o campo de "Sobre o pagamento"
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=parcelasCP')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Sobre o pagamento')
    cy.get('.def-t-clickable > p').click()

    //Teste12: Verificar se ao clicar no campo "< Voltar" é retornado à caixa de "Sua renda é maior que 3 mil reais?
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=rendaMensal')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Sua renda é maior que 3 mil reais?')
})