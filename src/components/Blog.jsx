import { useState } from 'react'

const Blog = ({ blog: { url, title, author, likes } }) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const getBlogDetails = () => (
    <div>
      <p>{url}</p>
      <p>likes {likes}
        <button>like</button>
      </p>
      <p>{author}</p>
    </div>
  )

  return (
  <div style={blogStyle}>
    <p>{title} <button onClick={()=> setIsInfoVisible(!isInfoVisible)}>{isInfoVisible ? 'hide' : 'view' }</button></p>
    {isInfoVisible && getBlogDetails()}
  </div>  
  )
}

export default Blog
