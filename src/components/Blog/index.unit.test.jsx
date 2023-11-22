import { screen, render  } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Blog from './index'
import React from 'react'


const loggedInUser = {
  token: 'abc123',
  username: 'paramhansa',
  name: 'Mukunda'
}

const user = {
  username: 'paramhansa',
  name: 'Mukunda'
}

const blog = {
  title: 'Be a Smile Millionaire',
  url: 'https://www.magic.com',
  author: 'Paramhansa Yogananda',
  likes: 0,
  user,
  id: '0101'
}

describe('Blog component', () => {
  test('render blog title by default', () => {
    const updateLikes = () => jest.fn()
    const removeBlog = () => jest.fn()

    render(<Blog blog={blog} userDetails={loggedInUser} updateLikes={updateLikes} removeBlog={removeBlog}/>)

    expect(screen.getByText(`${blog.title}`)).toBeInTheDocument()
    expect(screen.queryByText(`${blog.author}`)).not.toBeInTheDocument()
  })

  it('renders the url, likes & author when the view button is clicked', (done) => {
    const updateLikes = () => jest.fn()
    const removeBlog = () => jest.fn()

    render(<Blog blog={blog} userDetails={loggedInUser} updateLikes={updateLikes} removeBlog={removeBlog}/>)

    expect(screen.queryByText(`${blog.url}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`likes ${blog.likes}`)).not.toBeInTheDocument()
    expect(screen.queryByText(`${blog.author}`)).not.toBeInTheDocument()

    const viewButton =  screen.getByRole('button', {
      name: 'view'
    })

    expect(viewButton).toBeInTheDocument()

    userEvent.click(viewButton)

    setTimeout(() => {
      expect(screen.getByText(`${blog.url}`)).toBeInTheDocument()
      expect(screen.getByText(`likes ${blog.likes}`)).toBeInTheDocument()
      expect(screen.getByText(`${blog.author}`)).toBeInTheDocument()
      done()
    }, 2000)

  })

  it('does not render the remove button when the blog has not been created by the logged in user', () => {
    const newLoggedInUser = {
      token: 'abc123',
      username: 'viratkohli',
      name: 'Virat'
    }

    const updateLikes = () => jest.fn()
    const removeBlog = () => jest.fn()

    render(<Blog blog={blog} userDetails={newLoggedInUser} updateLikes={updateLikes} removeBlog={removeBlog}/>)

    const viewButton =  screen.queryByRole('button', {
      name: 'view'
    })

    expect(viewButton).toBeInTheDocument()

    const userInteraction = userEvent.setup()

    userInteraction.click(viewButton)

    const removeButton =  screen.queryByRole('button', {
      name: 'remove'
    })

    expect(removeButton).not.toBeInTheDocument()
  })

  it('calls the event handler twice when the like button is clicked twice', () => {
    const updateLikes =  jest.fn()
    const removeBlog =  jest.fn()

    render(<Blog blog={blog} userDetails={loggedInUser} updateLikes={updateLikes} removeBlog={removeBlog}/>)

    const viewButton =  screen.queryByRole('button', {
      name: 'view'
    })

    expect(viewButton).toBeInTheDocument()

    const userInteraction = userEvent.setup()

    userInteraction.click(viewButton)

    const likeButton =  screen.queryByRole('button', {
      name: 'like'
    })

    userInteraction.click(likeButton)
    userInteraction.click(likeButton)

    setTimeout(() => {
      expect(updateLikes.mock.calls).toHaveLength(2)
    }, 2000)
  })
})