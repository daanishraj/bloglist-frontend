import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification]= useState({ message:null })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const blogFormRef = useRef(null)

  const notify = (message, isError=false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message:null })
    }, 4000)
  }

  const createBlog = async (aBlog)=> {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(aBlog)
      setBlogs(blogs.concat(createdBlog))
      notify(`A new blog ${createdBlog.title} by ${user.name} added`)
    } catch(error) {
      console.log(error)
      notify(error.response.data.error, true)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
        const user = await loginService.login({
        username, password,
        })
        console.log({user})
        window.localStorage.setItem('loggedInUser', JSON.stringify(user))
        setUser(user)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
    } catch (error) {
        console.log(error)
        notify(error.response.data.error, true)
    }
    }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    blogService.setToken(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
    }
  }, [])

  if (user===null) {
    return (
      <div>
          <Notification message={notification.message} isError={notification.isError}/>
         <LoginForm
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
          />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification.message} isError={notification.isError}/>
      <div>
      <p>{user.name} logged in</p> <button onClick={handleLogout} type="submit">logout</button>
      </div>
    <div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={createBlog}/>
      </Togglable>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App