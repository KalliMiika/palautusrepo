const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0
  blogs.forEach(blog => total = total + blog.likes)
  return total
}

const favoriteBlog = (blogs) => {
  let fav = {
    title: "",
    author: "",
    likes: 0
  }
  blogs.forEach(blog => {
    if (blog.likes > fav.likes) {
      fav = blog
    }
  })
  return fav
}

const mostBlogs = (blogs) => {
  let temp = []
  blogs.forEach(blog => {
    let found = false
    temp.forEach(entry => {
      if (entry.author === blog.author) {
        found = true
        entry.count = entry.count + 1
      }
    })
    if (!found) {
      const entry = {
        'author' : blog.author,
        'count' : 1
      }
      temp = temp.concat(entry)
    }
  })
  let fav = {
    author: "",
    count: 0
  }
  temp.forEach(entry => {
    if (entry.count > fav.count) {
      fav = entry
    }
  })
  return fav
}

const mostLikes = (blogs) => {
  let temp = []
  blogs.forEach(blog => {
    let found = false
    temp.forEach(entry => {
      if (entry.author === blog.author) {
        found = true
        entry.likes = entry.likes + blog.likes
      }
    })
    if (!found) {
      const entry = {
        'author' : blog.author,
        'likes' : blog.likes
      }
      temp = temp.concat(entry)
    }
  })
  let fav = {
    author: "",
    likes: 0
  }
  temp.forEach(entry => {
    if (entry.likes > fav.likes) {
      fav = entry
    }
  })
  return fav
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}