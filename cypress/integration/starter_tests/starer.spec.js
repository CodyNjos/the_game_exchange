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
  

  describe('My First Test', () => {
    it('Visits localhost3000', () => {
      cy.visit('http://localhost:3000/#/home')
      cy.viewport(1500, 700)
    })
  })


//     it('displays two todo items by default', () => {
//     // We use the `cy.get()` command to get all elements that match the selector.
//     // Then, we use `should` to assert that there are two matched items,
//     // which are the two default items.
 
//     cy.get('.todo-list li').first().should('have.text', 'Pay electric bill')
//     cy.get('.todo-list li').last().should('have.text', 'Walk the dog')
//   })