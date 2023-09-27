import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const getNewBlog = () => ({
    title: '',
    author: '',
    url: ''
  })

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState(getNewBlog())
  const [notification, setNotification]= useState({ message:null })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const notify = (message, isError=false) => {
    setNotification({ message, isError })
    setTimeout(() => {
      setNotification({ message:null })
    }, 4000)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
       <input
          type="text"
          value={newBlog.title}
          name="Title"
          onChange={({ target }) => setNewBlog({...newBlog, title: target.value})}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={newBlog.author}
          name="Author"
          onChange={({ target }) => setNewBlog({...newBlog, author: target.value})}
        />
      </div>
      <div>
        url:
        <input
          type="url"
          value={newBlog.url}
          name="Url"
          onChange={({ target }) => setNewBlog({...newBlog, url: target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  const addBlog = async (event) => {
    event.preventDefault()
    const payload = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    try {
      const newBlog = await blogService.create(payload)
      setBlogs(blogs.concat(newBlog))
      setNewBlog(getNewBlog())
      notify(`A new blog ${newBlog.title} by ${user.name} added`)
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
        <h2>Log in to application</h2>
        {loginForm()}
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
        <h2>Create new</h2>
      {blogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App