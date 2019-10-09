/// <reference types="Cypress" />

describe('Create, join and leave a room', function() {

    const name = 'Tester'

    beforeEach(function () {
      Cypress.Cookies.preserveOnce('name')
    })

    it('Owner clicking "NOUVELLE PARTIE" should create a new room, and display welcoming message', function() {
      cy.visit('/')

      cy.viewport(1200, 700)
  
      cy.get('button').contains('nouvelle partie').click()
  
      cy.get('body').should('contain.text', 'rejoignez la partie')

      cy.get('.room-ribbon').invoke('text').as('room')
    })

    it('Player clicking "REJOINDRE" after filling inputs with correct room name should join this room', function() {
      cy.viewport('iphone-6+', 'portrait')

      cy.reload()

      cy.get('input#name').clear().type(name)

      cy.get('input#room').type(this.room)
  
      cy.get('button').contains('rejoindre').click()
  
      cy.get('body')
        .should('contain.text', 'quitter')
        .and('contain.text', '2 joueurs')
        .and('contain.text', 'INSTRUCTIONS')

      cy.get('input[type="checkbox"]').should('not.be.checked')
    })

    it('Player clicking "QUITTER" should leave the room', function() { 
      cy.viewport('iphone-6+', 'portrait')

      cy.get('button').contains('quitter').click()
  
      cy.get('button').should('contain.text', 'rejoindre')

      cy.get('input#name').should('contain.value', name)
    })
  })