import { useState } from 'react'

const getNewBlog = () => ({
    title: '',
    author: '',
    url: ''
  })

const BlogForm = ({createBlog}) => {
  const [newBlog, setNewBlog] = useState(getNewBlog())
  const [isFormVisible, setIsFormVisible] = useState(false)

    const addBlog = async (event) => {
        event.preventDefault()
        const payload = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url
        }
        
        createBlog(payload)
        setNewBlog(getNewBlog())
        setIsFormVisible(false)
      }

    const onToggleBlogForm = () => setIsFormVisible(!isFormVisible)

      const getForm = () => (
        <>
        <h2>Create new</h2>
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
          <button type="submit" onClick={onToggleBlogForm}>cancel</button>
        </form> 
        </>
      )
    

    return (
      <>
      {!isFormVisible && <button onClick={onToggleBlogForm}>new blog</button>}
      {isFormVisible && getForm()}
      </>
      )

}

export default BlogForm