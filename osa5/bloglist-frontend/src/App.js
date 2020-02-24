import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  function logout() {
    window.localStorage.removeItem('loggedBlogappUser')
    setNotificationMessage('logged out from ' + user.name)
    setNotificationType('neutral')
    setUser(null)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('wrong username or password')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage('a new blog ' + blogObject.title + ' added')
      setNotificationType('notif')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('invalid inputs')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const like = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogService.update(id, changedBlog)
    setBlogs(blogs.map(b => {
      if (b.id === id) {
        const bb = { ...blog, likes: blog.likes + 1 }
        return bb
      }
      return b
    }))
  }

  const remove = async (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm('Remove Blog ' + blog.title + ' by ' + blog.author)) {
      await blogService.remove(id)
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    }
  }

  const blogFormRef = React.createRef()
  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const orderByLikes = () => {
    blogs.sort((a, b) => b.likes - a.likes)
  }

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notificationMessage} type={notificationType} />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in
            <button onClick={logout}>logout</button>
          </p>
          {blogForm()}
        </div>
      }
      {orderByLikes()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user.name} like={() => like(blog.id)} remove={() => remove(blog.id)} />
      )}
    </div>
  )
}

export default App