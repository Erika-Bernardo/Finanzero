///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

it('Caixa “Sobre o pagamento”', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=parcelasCP')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()


    //Teste20: Verificar se tem o campo descritivo "Quer pagar em quantas parcelas?"
    cy.get('legend').should('be.visible').should('have.text', 'Quer pagar em quantas parcelas?')

    //Teste21: Verificar se os botões com os meses são apresentados conforme a tela de "Sobre pagamento" escolhida
    cy.get('#loanPeriodInMonths > :nth-child(1)')
    cy.get('#loanPeriodInMonths > :nth-child(2)')
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(4)')

    //Teste22: Verificar se o campo "< Voltar" está disponível e está habilitado para clique
    cy.get('.def-t-clickable > p').should('be.visible').should('not.be.disabled')

    //Teste23: Verificar se após selecionar um dos planos em meses, é apresentado e esteja habilitado para clique um botão de "Avançar + (quantidade de meses selecionada)"
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary')
        .should('be.visible')
        .should('not.be.disabled')

    //Teste24: Verificar se após clicar no botão "Avançar com + (valor selecionado)" é redirecionada para nova caixa com o campo "Sua renda é maior que 3 mil reais?
    cy.get('.def-sf-secondary').click()
    cy.url('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.form--title')
        .should('be.visible')
        .should('contain', 'Peça uma cotação grátis!')



})




