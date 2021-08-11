//Reusable Functions


// // Not best practice to target by ID, all targets need updating https://docs.cypress.io/guides/references/best-practices#Selecting-Elements \\ \\
const login = () => {
    const login = "Cypress"
    const password = "123" //should be accessed from Database
    cy.get('#username').should('have.value', '')
    cy.get('#password').should('have.value', '')
    cy.get('#username').type(`${login}`) 
    cy.get('#password').type(`${password}`)
    cy.get('#username').should(`have.value`, `${login}`)
    cy.get('#password').should(`have.value`, `${password}`)
    cy.get('#loginButton').click()
}

const loginMobile = () => {
    const login = "Cypress"
    const password = "123" //should be accessed from Database
    cy.get('#username').type(`${login}`) 
}

const selectProfileDesktop = () => {
    cy.get('#profileLink').click()
}


// Desktop Tests

//Test login System.
//*Currently uses hardcoded data*
describe('Desktop Login Test', () => {
    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
    })
    it('Login Success', () => { // 
        login();
    })
    //Makes sure alert appears if login fails
    it('Login Failure', () => { 
        cy.wait(200)
        const login = "NotAUser"
        const password = "123"
        cy.get('#username').should('have.value', '')
        cy.get('#password').should('have.value', '')
        cy.get('#username').type(`${login}`)
        cy.get('#password').type(`${password}`)
        cy.get('#username').should(`have.value`, `${login}`)
        cy.get('#password').should(`have.value`, `${password}`)
        cy.get('.alert').should('not.exist')
        cy.get('#loginButton').click()
        cy.get('.alert').should('exist')
    })

})

// Makes sure responsive nav bar is working
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

// Adds a game to the collection, Updates, then deletes that game
describe('Add Update, And Remove Game in Collection', () => {
    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
        login()
        selectProfileDesktop()
    })
    //Adds a game to the collection
    it('Add Game', () => {
        cy.get('#addGameButton').click()
        cy.get('#addGameInput').type('Frosthaven')
        cy.get('#addDetailsInput').type('The long awaited sequel to 2017\'s Gloomhaven')
        cy.get('#addImageInput').type('https://i.imgur.com/z9d2DR1l.jpg')
        cy.get('#addGameButton').click()
    })
    //Updates details for new game
    it('Update Game', () => {
        cy.get('#collectionWrap .gameCard #editGameButton').click()
        cy.get('#updateDetailsInput').type('Updated details for Frosthaven')
        cy.get('#updateDetailsButton').click()
        cy.get('#detailsText').should('contain.text', 'Updated details for Frosthaven')
        
    })
    //Deletes newly created game
    it('Remove Game', () => {
        cy.get('#collectionWrap .gameCard').should('have.length', 1)
        cy.get('#collectionWrap .gameCard').first().should('contain.text', 'Frosthaven') //contain.text is looser than have.text
        cy.scrollTo('bottom')
        cy.get('#collectionWrap .gameCard #editGameButton').click()
        cy.scrollTo('bottom')
        cy.get('#removeButton').click()
        cy.get('#confirmRemove').click()
        //Not particularly useful, just testing if statements in Cypress
        if( cy.get('#collectionWrap .gameCard').should('have.length', 0)){
            cy.visit('http://localhost:3000/#/wishlist')
        }else{
            cy.visit('http://localhost:3000/#/homepage')
        }
    })
})

//Adds a game to the wishlist, then deletes that game
describe('Add and Remove Game in Wishlist', () => {
    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
        login()
        selectProfileDesktop()
    })
    //Adds a game to the wishlist
    it('Add Wishlist Game', () => {
        cy.get('#addWishlistButton').click()
        cy.get('#addWishlistInput').type('Frosthaven')
        cy.get('#addWishlistImage').type('https://i.imgur.com/z9d2DR1l.jpg')
        cy.get('#wishlistSubmit').click()
    })
    //Deletes newly created game
    it('Remove Wishlist Game', () => {
        cy.scrollTo('bottom')
        cy.get('#removeWishlistButton').click()
        cy.get('#Wrap .gameCard').should('have.length', 0)
    })
})

describe('Test Search and View Details', () => {
    beforeEach(() => {
        cy.viewport('macbook-13')
        cy.visit('http://localhost:3000/#/home')
        login()
    })
    //Searches Available Games for Catan
    it('Test Available Games Search', () => {
    cy.get('#availableSearch').type('catan')
    cy.get('.cardWrap').should('contain.text', 'Catan')
    })
    it('Test In Demand Games Search', () => {
       cy.visit('http://localhost:3000/#/wishlist')
       cy.get('#inDemandSearch').type('robinson crusoe')
       cy.get('.cardWrap').should('contain.text', 'Robinson Crusoe')
    })
})
