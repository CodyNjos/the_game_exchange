describe('Passing Test', () => {
    it('Will Pass', () => {
      expect(true).to.equal(true)
    })
  })
  
describe('Failing test', () => {
    it('Will Fail', () => {
        expect(true).to.equal(false)
    })
})
  
describe('Login Test', () => {
    beforeEach(() => {
       
        cy.visit('http://localhost:3000/#/home')
        cy.viewport(1500, 700)
   
    })
    it('type in login', () => { 
        cy.get('#username').should('have.value', '')
        cy.get('#password').should('have.value', '')
        const login = "Cypress"
        const password = "123" //should be accessed from Database
        cy.get('#username').type(`${login}`) // Not best practice to target like this, needs updating https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
        cy.get('#password').type(`${password}`)
        cy.get('#username').should(`have.value`, `${login}`)
        cy.get('#password').should(`have.value`, `${password}`)
        cy.get('#loginButton').click()
    })
})

describe('Responsive Nav Test', () => {
    beforeEach(() => {
       
        cy.visit('http://localhost:3000/#/home')
   
    })
    it('Test Responsive Nav (Iphone X )', () => { 
        cy.viewport(375, 812)
        cy.get('.nav button').should('have.length', 1)
        cy.get('.nav a').should('have.length', 1)
    })
    it('Test Responsive Nav(Pixel 2)', () => { 
        cy.viewport(411, 731)
        cy.get('.nav button').should('have.length', 1)
        cy.get('.nav a').should('have.length', 1)
    })
    it('Test Responsive Nav (13in MacBook Pro)', () => { 
        cy.viewport(2560, 1600)
        cy.get('.nav button').should('have.length', 1)
        cy.get('.nav a').should('have.length', 5)
    })
})