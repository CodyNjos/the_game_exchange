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
const selectProfileDesktop = () => {
    cy.get('#profileLink').click()
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
        cy.wait(200)
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
        cy.viewport('macbook-13') //built in device
        cy.get('.nav button').should('have.length', 1)
        cy.get('.nav a').should('have.length', 5)
    })
})

describe('Add And Remove Game', () => {
    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
        loginFunction()
        selectProfileDesktop()
    })
    it('Add Game', () => {
        cy.get('#addGameButton').click()
        cy.get('#addGameInput').type('Frosthaven')
        cy.get('#addDetailsInput').type('The long awaited sequel to 2017\'s Gloomhaven')
        cy.get('#addImageInput').type('https://i.imgur.com/z9d2DR1l.jpg')
        cy.get('#addGameButton').click()
    })
    it('Remove Game', () => {
        cy.get('#collectionWrap .gameCard').should('have.length', 1)
        cy.get('#collectionWrap .gameCard').first().should('contain.text', 'Frosthaven')
        cy.scrollTo('bottom')
        cy.get('#collectionWrap .gameCard #editGameButton').click()
        cy.scrollTo('bottom')
        cy.get('#removeButton').click()
        cy.get('#confirmRemove').click()
        cy.get('#collectionWrap .gameCard').should('have.length', 0)
    })
})