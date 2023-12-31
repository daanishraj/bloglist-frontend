import { useState, useEffect, useRef, useMemo } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import useGetBlogs from './hooks/UseGetBlogs'
import useCreateBlog from './hooks/UseCreateBlog'
import useUpdateBlogLikes from './hooks/UseUpdateBlogLikes'
import { useDispatchNotification } from './contexts/NotificationContext'
import useDeleteBlog from './hooks/useDeleteBlog'

const App = () => {
  const notify = useDispatchNotification()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef(null)
  const sortedBlogs = useMemo(
    () => blogs.toSorted((a, b) => b.likes - a.likes),
    [blogs]
  )
  const [data, isLoading, isError, error] = useGetBlogs()
  const [{ createBlog }] = useCreateBlog(notify, user)
  const [{ likeBlog }] = useUpdateBlogLikes(notify)
  const [{ deleteBlog }] = useDeleteBlog(notify)

  console.log({ sortedBlogs })

  const createNewBlog = async (aBlog) => {
    blogFormRef.current.toggleVisibility()
    const newBlog = await createBlog(aBlog)
    setBlogs(blogs.concat(newBlog))
  }

  const updateBlogLikes = (payload, blogId) => likeBlog({ payload, blogId })

  const removeBlog = (blogId) => deleteBlog(blogId)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
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
    if (data) {
      setBlogs(data)
    }
  }, [data])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification/>
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

  if (isLoading) {
    return <div>loading..</div>
  }

  if (isError) {
    return <div>`there was an error: ${error.message}`</div>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification/>
      <div>
        <p>{user.name} logged in</p>{' '}
        <button onClick={handleLogout} type="submit">
          logout
        </button>
      </div>
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createNewBlog} />
        </Togglable>
      </div>
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateBlogLikes}
          userDetails={user}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  )
}

export default App
