///<reference types = "cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

describe('Teste de simulação de valores no site Finanzero', () => {
    it('Caixa “Peça uma cotação grátis!”', () => {
        cy.visit('https://finanzero.com.br/')

        //Esperar até que a página seja carregada e a caixa de texto "Peça uma cotação grátis!" apareça
        cy.get('.simulate').should('exist')

        //Teste 1: Verificar se o campo "quanto que emprestar?" está visível e editável
        cy.get('legend')
            .should('be.visible')
            .should('not.be.disabled')

        //Teste 2: Verificar se os ícones "+" e "-" estão visíveis e habilitados para clique
        cy.get('.fa-plus')
            .should('be.visible')
            .should('not.be.disabled')

        cy.get('.fa-minus')
            .should('be.visible')
            .should('not.be.disabled')

        //Teste 5: Verificar se o botão "Avançar com + (valor selecionado)" está visível e habilitado para clique, mesmo que nenhuma alteração seja feita no valor
        cy.get('.def-sf-secondary')
            .should('be.visible')
            .should('not.be.disabled')

        //Teste 3: Verificar se ao clicar no ícone "-" o valor é diminuído corretamente, descontando 500,00 do valor final
        cy.get('.fa-minus').click()
        cy.get('.slider--value > span').should('have.text', 'R$7.500')

        //Teste 4: Verificar se ao clicar no ícone "+" o valor é aumentado corretamente, acrescentando 500,00 ao valor final
        cy.get('.fa-plus').click()
        cy.get('.slider--value > span').should('have.text', 'R$8.000')

        //Teste 6: Verificar se após ajuste de valor o botão "Avançar com + (valor selecionado)" se mantém ativo e habilitado para clique
        cy.get('.fa-minus').click()
        cy.get('.fa-plus').click()
        cy.get('.def-sf-secondary')
            .should('be.visible')
            .should('not.be.disabled')

        //Teste 7: Verificar se após clicar no botão "Avançar com + (valor selecionado)" é redirecionada para nova caixa com o campo "Sua renda é maior que 3 mil reais?
        cy.get('.def-sf-secondary').click()
        cy.url('https://finanzero.com.br/?wizfluxoDeProduto=rendaMensal')
        cy.get('.def-ts-title')
            .should('be.visible')
            .should('contain', 'Sua renda é maior que 3 mil reais?')
    })
})
    
