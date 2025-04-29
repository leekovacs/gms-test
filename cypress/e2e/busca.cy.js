/// <reference types="cypress"/>

describe('US - 001 Funcionalidade: Busca de filmes', () => {
    beforeEach( () => {
        cy.visit('http://127.0.0.1:8080/')
      });

      it('Busca de filmes por palavra-chave', () => {
    
        cy.get('#search-input').type('The Matrix')
        cy.get('#search-button').click()
        cy.get('#results-section').should('be.visible')
      })
    
      it('Busca de filmes por palavra-chave inexistente', () => {
        
        cy.get('#search-input').type('3ix357')
        cy.get('#search-button').click()
        cy.get('#results-section').should("contain" , "Filme não encontrado")
      })
    
      it('Testando botão de limpar busca', () => {
        
        cy.get('#search-input').type('The Matrix')
        cy.get('#clear-button').click()
        cy.get('#search-input').should('have.value' , '')
      })
})