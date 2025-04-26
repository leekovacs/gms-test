/// <reference types="cypress"/>

describe('US - 012 Funcionalidade: Cadastro de membros', () => {
  it('Deve fazer o cadastro de campos obrigatórios', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luiz")
    cy.get('#signup-lastname').type("Carlos")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })
  
  it('Cadastro de email inválido', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte!teste")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "E-mail deve ser um email válido")
  })

  it('Não preencher campo obrigatório NOME', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Nome não pode estar vazio")
  })

  it('Não preencher o campo obrigatório SOBRENOME', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Sobrenome não pode estar vazio")
  })

  it('Não preencher o campo obrigatório EMAIL', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "E-mail não pode estar vazio")
  })

  it('Não preencher o campo obrigatório SENHA', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Senha não pode estar vazia")
  })

  it('Fazer cadastro preenchendo todos os campos disponíveis', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })
 
  it('Bloqueio de senha fraca', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("senha123")
    cy.get('#signup-response').should("contain" , "Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)")
  })

  it('Confirmação de senha forte', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails234forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("Senhaforte$%#1234")
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })

  it('Validação link de política de privacidade', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('a').click()
    cy.url().should('http://127.0.0.1:8080/polices.html')
  })
})

describe('US - 001 Funcionalidade: Busca de filmes', () => {
  it('Busca de filmes por palavra-chave', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#search-input').type('The Matrix')
    cy.get('#search-button').click()
    cy.get('#results-section').should('be.visible')
  })

  it('Busca de filmes por palavra-chave inexistente', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#search-input').type('3ix357')
    cy.get('#search-button').click()
    cy.get('#results-section').should("contain" , "Filme não encontrado")
  })

  it('Testando botão de limpar busca', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('#search-input').type('The Matrix')
    cy.get('#clear-button').click()
    cy.get('#search-input').should('have.value' , '')
  })

})