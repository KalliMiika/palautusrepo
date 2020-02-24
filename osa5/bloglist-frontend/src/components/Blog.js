import React, { useState } from 'react'

const Blog = ({ blog, user, like, remove }) => {
  const [visible, setVisible] = useState(false)
  const buttonText = visible ? 'hide' : 'show'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const deleteButton = () => {
    if (user === blog.user.name) {
      return (
        <div><button className='removebutton' onClick={remove}>remove</button></div>
      )
    }
    return (
      <>
      </>
    )
  }

  const content = () => {
    if (visible) {
      return (
        <div>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={like}>like this blog</button>
          </div>
          <div>{blog.user.name}</div>
          {deleteButton()}
        </div>
      )
    }
    return (
      <>
      </>
    )
  }

  return (
    <div className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{buttonText}</button>
      </div>
      {content()}
    </div>
  )
}

export default Blog
