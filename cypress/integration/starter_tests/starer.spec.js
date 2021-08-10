const loginFunction = () => {
    const login = "Cypress"
        const password = "123" //should be accessed from Database
        cy.get('#username').should('have.value', '')
        cy.get('#password').should('have.value', '')
        cy.get('#username').type(`${login}`) // Not best practice to target like this, needs updating https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
        cy.get('#password').type(`${password}`)
        cy.get('#username').should(`have.value`, `${login}`)
        cy.get('#password').should(`have.value`, `${password}`)
        cy.get('#loginButton').click()
}


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
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
        
   
    })
    it('Login Success', () => { // 
        loginFunction();
    })
    it('Login Failure', () => { 
        const login = "NotAUser"
        const password = "123" //should be accessed from Database
        cy.get('#username').should('have.value', '')
        cy.get('#password').should('have.value', '')
        cy.get('#username').type(`${login}`) // Not best practice to target like this, needs updating https://docs.cypress.io/guides/references/best-practices#Selecting-Elements
        cy.get('#password').type(`${password}`)
        cy.get('#username').should(`have.value`, `${login}`)
        cy.get('#password').should(`have.value`, `${password}`)
        cy.get('.alert').should('not.exist')
        cy.get('#loginButton').click()
        cy.get('.alert').should('exist')
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

describe('Add And Remove Game', () => {
    it('Test outside function', () => {
        loginFunction()
    })
})