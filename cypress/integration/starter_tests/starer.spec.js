describe('Passing Test', () => {
    it('Will Pass', () => {
      expect(true).to.equal(true)
    })
  })
  
// describe('Failing test', () => {
//     it('Will Fail', () => {
//         expect(true).to.equal(false)
//     })
// })
  
describe('Login Test', () => {
    beforeEach(() => {
       
        cy.visit('http://localhost:3000/#/home')
        cy.viewport(1500, 700)
   
    })
    it('type in login', () => { 
        const login = "Cypress"
        const password = "123" //should be accessed from Database
        cy.get('#username').type(`${login}`) // Not best practice to target like this, needs updating https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
        cy.get('#password').type(`${password}`)
        cy.get('#loginButton').click()
    })
})

describe('Reactive Nav Test', () => {
    beforeEach(() => {
       
        cy.visit('http://localhost:3000/#/home')
   
    })
    it('Test Mobile (Iphone X )', () => { 
        cy.viewport(375, 812)
    })
    it('Test Mobile (Pixel 2)', () => { 
        cy.viewport(411, 731)
    })
})