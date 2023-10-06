describe('Bloglist', function(){
  beforeEach(function(){
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'paramhansa',
      name: 'yogananda',
      password: 'Divine'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', () => {
    cy.contains('Log in to application')
  })

  describe('Login', function(){
    it('succeeds with correct credentials', function(){
      cy.get('[data-testid="username"]').type('paramhansa')
      cy.get('[data-testid="password"]').type('Divine')
      cy.get('[data-testid="login-button"]').click()

      cy.contains('yogananda logged in')

    })

    it('fails with incorrect password ', function(){
      cy.get('[data-testid="username"]').type('paramhansa')
      cy.get('[data-testid="password"]').type('maya')
      cy.get('[data-testid="login-button"]').click()

      cy.get('.failure').should('contain','invalid password')
      cy.contains('yogananda logged in').should('not.exist')

    })
  })
})