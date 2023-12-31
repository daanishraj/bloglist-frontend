import { useState } from 'react'

const Blog = ({ blog: { url, title, author, likes, id, user }, updateLikes, userDetails, removeBlog }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const onLike = () => {
    const updatedLikes = likes + 1
    const payload = {
      url,
      title,
      author,
      likes: updatedLikes,
      userId: user.id
    }

    updateLikes(payload, id)
  }

  const onRemove = () => {
    const message = `Remove blog ${title} by ${author}?`
    const shouldRemove = window.confirm(message)
    if (shouldRemove){
      removeBlog(id)
    }
  }

  const getBlogDetails = () => (
    <div data-testid="blog-details">
      <p>{url}</p>
      <p>likes {likes}
        <button data-testid="like-button" onClick={onLike}>like</button>
      </p>
      <p>{author}</p>
      { userDetails.username === user.username && <button onClick={onRemove}>remove</button>}
    </div>
  )

  return (
    <div style={blogStyle}>
      <p data-testid="blog-title">{title} <button onClick={() => setIsInfoVisible(!isInfoVisible)}>{isInfoVisible ? 'hide' : 'view' }</button></p>
      {isInfoVisible && getBlogDetails()}
    </div>
  )
}

export default Blog
