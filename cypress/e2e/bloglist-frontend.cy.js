const username = 'paramhansa'
const password = 'Divine'
const name = 'yogananda'

describe('Bloglist', function(){
  beforeEach(function(){
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username,
      name,
      password
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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

  describe('when logged in', function(){
    beforeEach(function(){
      cy.login({ username, password })
      // should we delete all the blogs in the database before starting?
    })

    it('A blog can be created', function(){
      const title = 'First blog...'
      const author = 'Michael Schumacher'
      const url = 'https://www.yoga.org'
      cy.create({ title, author, url })

      cy.get('[data-testid="blog-title"]').should('contain', title)
    })

    it('A blog can be liked', function(){
      const title = 'Second blog...'
      const author = 'Jesus'
      const url = 'https://www.yoga.de'
      cy.create({ title, author, url })

      cy.contains('view').click()
      cy.get('[data-testid="blog-details"]').should('contain', 'likes 0')
      cy.get('[data-testid="blog-details"] button:contains("like")').click()
      cy.get('[data-testid="blog-details"]').should('contain', 'likes 1')
    })

    it('A blog created by that user can be deleted by them', function(){
      const title = 'Third blog...'
      const author = 'Virat Kohli'
      const url = 'https://www.yoga.de'
      cy.create({ title, author, url })

      cy.contains('view').click()

      cy.get('[data-testid="blog-title"]').should('contain', title)

      cy.get('[data-testid="blog-details"] button:contains("remove")').click()

      cy.get('html').should('not.contain', title)
    })

    it('does not show delete button for the blog when the user is different from creator', function(){
      const secondUser = {
        username: 'swami',
        name: 'yukteswar',
        password: 'Serampore'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)

      //first user creates a blog
      const title = 'Third blog...'
      const author = 'Virat Kohli'
      const url = 'https://www.yoga.de'
      cy.create({ title, author, url })

      cy.get('[data-testid="blog-title"]').should('contain', title)
      cy.contains('view').click()
      cy.get('[data-testid="blog-details"]').should('contain', 'remove')

      cy.get('button:contains("logout")').click()

      //second user logs in
      cy.login({ username: secondUser.username, password: secondUser.password })
      cy.get('[data-testid="blog-title"]').should('contain', title)
      cy.contains('view').click()
      cy.get('[data-testid="blog-details"]').should('not.contain', 'remove')
    })
  })
})