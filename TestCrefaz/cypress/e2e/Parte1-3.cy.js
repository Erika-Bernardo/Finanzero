///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Deseja usar seu veículo como garantia”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=rendaMensal')
    cy.get('.def-sf-secondary').click()

    //Teste13: Verificar se após clicar em "SIM" na caixa "Você possui veículo quitado em seu nome?" seja redirecionado para a caixa "Deseja usar seu veículo como garantia?"
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=hasVehicle')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Você possui veículo quitado em seu nome?')
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=vehicleDebtSecurity')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Deseja usar seu veículo como garantia?')

    //Teste14: Verificar se os botões "SIM" e "NÃO" estão visíveis na caixa de pergunta e habilitados para clique
    cy.get('.def-mr-gutter > .def-sf-clickable').should('be.visible').should('not.be.disabled')
    cy.get('.def-ml-gutter > .def-sf-clickable').should('be.visible').should('not.be.disabled')

    //Teste15: Verificar se o campo "< Voltar" está disponível e está habilitado para clique
    cy.get('.def-t-clickable > p').should('be.visible').should('not.be.disabled')

    //Teste16: Verificar se ao clicar no botão "SIM" é redirecionada para nova caixa com o campo de "Sobre o pagamento"
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=vehicleDebtSecurity')
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=parcelasRefin')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Sobre o pagamento')

    //Teste17: Verificar se na caixa "Sobre o pagamento" estão dispostos 7 botões com contagem em meses
    cy.get('#loanPeriodInMonths > :nth-child(1)')
    cy.get('#loanPeriodInMonths > :nth-child(2)')
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(4)')
    cy.get('#loanPeriodInMonths > :nth-child(5)')
    cy.get('#loanPeriodInMonths > :nth-child(6)')
    cy.get('#loanPeriodInMonths > :nth-child(7)')

    //Teste18: Verificar se ao clicar no botão "NÃO" é redirecionada para nova caixa com o campo de "Sobre o pagamento"
    cy.get('.def-t-clickable > p').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=vehicleDebtSecurity')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Deseja usar seu veículo como garantia?')
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=parcelasCP')
    cy.get('.def-ts-title')
        .should('be.visible')
        .should('contain', 'Sobre o pagamento')

    //Teste19: Verificar se na caixa "Sobre o pagamento" estão dispostos 4 botões com contagem em meses
    cy.get('#loanPeriodInMonths > :nth-child(1)')
    cy.get('#loanPeriodInMonths > :nth-child(2)')
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(4)')

})