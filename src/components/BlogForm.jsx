import { useState } from 'react'

const getNewBlog = () => ({
    title: '',
    author: '',
    url: ''
  })

const BlogForm = ({createBlog}) => {
  const [newBlog, setNewBlog] = useState(getNewBlog())

    const addBlog = async (event) => {
        event.preventDefault()
        const payload = {
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url
        }
        
        await createBlog(payload)
        setNewBlog(getNewBlog())
      }
    

    return (
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
        </form> 
        </> 
      )

}

export default BlogForm