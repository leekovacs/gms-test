/// <reference types="cypress"/>

describe('US - 012 Funcionalidade: Cadastro de membros', () => {
  beforeEach( () => {
    cy.visit('http://127.0.0.1:8080/')
  });

  it('Deve fazer o cadastro de campos obrigatórios', () => {
    var email = `fabio${Date.now()}@testes.com`
    cy.preencherCadastro('Luiz', 'Carlos', email, '112233445566', 'Teste#$%123')
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })
  
  it('Cadastro de email inválido', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte!teste")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "E-mail deve ser um email válido")
  })

  it('Não preencher campo obrigatório NOME', () => {
    
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Nome não pode estar vazio")
  })

  it('Não preencher o campo obrigatório SOBRENOME', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Sobrenome não pode estar vazio")
  })

  it('Não preencher o campo obrigatório EMAIL', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "E-mail não pode estar vazio")
  })

  it('Não preencher o campo obrigatório SENHA', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-button').click()
    cy.get('#signup-response').should("contain" , "Senha não pode estar vazia")
  })

  it('Fazer cadastro preenchendo todos os campos disponíveis', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("Senha#$12345")
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })
 
  it('Bloqueio de senha fraca', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails2forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("senha123")
    cy.get('#signup-response').should("contain" , "Senha deve ter pelo menos 8 caracteres, incluir uma letra maiúscula, um número e um caractere especial (!@#$&*)")
  })

  it('Confirmação de senha forte', () => {
    
    cy.get('#signup-firstname').type("Luis")
    cy.get('#signup-lastname').type("Gomes")
    cy.get('#signup-email').type("emails234forte@teste.com")
    cy.get('#signup-phone').type("11223344556677")
    cy.get('#signup-password').type("Senhaforte$%#1234")
    cy.get('#signup-response').should("contain" , "Cadastro realizado com sucesso!")
  })

  it('Validação link de política de privacidade', () => {
    
    cy.get('a').click()
    cy.url().should('http://127.0.0.1:8080/polices.html')
  })
})
