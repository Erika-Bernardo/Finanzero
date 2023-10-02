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
    //cy.get(':nth-child(2) > :nth-child(1) > .form--group > .form--err > .validation-errors').should('not.be.visible').should('contain', 'Digite seu nome completo como está no RG.')
  })
  ///<reference types = "cypress" />

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('Caixa “Qual o seu CPF', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste31: Verificar se o campo está visível, habilitado e editável
    cy.get('#personalNumber').should('be.visible').should('not.be.disabled')

    //Teste32: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Digite o número do seu CPF.”
    cy.get('#buttonCompare').click()
    cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Digite o número do seu CPF.')

    //Teste33: Verificar se são aceitos apenas caracteres do tipo numérico
    cy.get('#personalNumber').type('ABC123@#$')

    //Teste34: Verificar se o preenchimento com CPF inválido, uma mensagem seja apresentada
    cy.get('#personalNumber').clear()
    cy.get('#personalNumber').type('99999999999')
    cy.get('#buttonCompare').click()
    cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Digite o número do seu CPF.')

    //Teste35: Verificar se ao preencher corretamente o campo, nenhuma mensagem seja apresentada
    cy.get('#personalNumber').clear()
    cy.get('#personalNumber').type('70404688080')
    cy.get('#buttonCompare').click()
    //cy.get('.two-col > :nth-child(1) > .form--err > .validation-errors').should('not.be.visible')
  })

  ///<reference types = "cypress" />

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  it('Caixa “Qual o seu CPF', () => {
    cy.visit('https://finanzero.com.br/?wizfluxoDeProduto=finalFormPage')
    cy.get('.def-sf-secondary').click()
    cy.get('.def-mr-gutter > .def-sf-clickable').click()
    cy.get('.def-ml-gutter > .def-sf-clickable').click()
    cy.get('#loanPeriodInMonths > :nth-child(3)')
    cy.get('#loanPeriodInMonths > :nth-child(1)').click()
    cy.get('.def-sf-secondary').click()

    //Teste36: Verificar se o campo está visível, habilitado e editável
    cy.get('#civilStatus').should('be.visible').should('not.be.disabled')

    //Teste37: Verificar se ao não preencher nada no campo se algum erro ou mensagem é exibida “Selecione seu estado civil.”
    cy.get('#buttonCompare').click()
    cy.get(':nth-child(2) > .form--err > .validation-errors')
      .should('be.visible')
      .should('contain', 'Selecione seu estado civil.')

    //Teste40: Verificar se ao selecionar corretamente uma das opções da lista, nenhuma mensagem seja apresentada
    cy.get('#civilStatus').select('Casado(a)')
    cy.get('#buttonCompare').click()
    //cy.get(':nth-child(2) > .form--err > .validation-errors').should('not.be.visible').should('contain', 'Selecione seu estado civil.')
  })

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
    //cy.get(':nth-child(3) > .form--err > .validation-errors').should('not.be.visible').should('contain', 'Selecione sua data de nascimento.')
  })

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
    //cy.get(':nth-child(4) > .form--err > .validation-errors').should('not.be.visible').should('contain', 'Selecione sua ocupação principal.')
  })

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
    //cy.get(':nth-child(5) > .form--err > .validation-errors').should('not.be.visible')
  })

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
    //cy.get(':nth-child(6) > .form--err > .validation-errors').should('not.be.visible')
  })

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
      cy.get('#fullName').type('abv tgf')
      cy.get('#personalNumber').type('826.486.700-68')
      cy.get('#civilStatus').select('Casado(a)')
      cy.get('#DD_birthDate').select('20')
      cy.get('#MM_birthDate').select('11')
      cy.get('#YY_birthDate').select('1947')
      cy.get('#workStatus').select('Desempregado')
      cy.get('#telephoneNumber').type('44977889944')
      cy.get('#email').type('joao@asdf.com')
      cy.get('#buttonCompare').click()
      cy.get('.form--title')
        .should('be.visible')
        .should('contain', 'Precisamos saber mais um pouquinho sobre você')
    })
  })
})