const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b66a676234d17f8',
    title: 'Testi titteli',
    author: 'Tittelin testaaja',
    url: 'http://juutuupi.com',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b77a676234d17f8',
    title: 'Jokin titteli',
    author: 'yks tyyppi',
    url: 'http://netti.sivu',
    likes: 8,
    __v: 0
  },
  {
    _id: '5a422aa71b77a126234d17f8',
    title: 'jekun juukeli',
    author: 'yks tyyppi',
    url: 'http://netti2.sivu',
    likes: 15,
    __v: 0
  },
  {
    _id: '5a411aa71b66a676234d17f8',
    title: 'Testi 2 titteli',
    author: 'Tittelin testaaja',
    url: 'http://juu1tuupi.com',
    likes: 3,
    __v: 0
  },
  {
    _id: '5a433aa71b66a676234d17f8',
    title: 'Testi 3 titteli',
    author: 'Tittelin testaaja',
    url: 'http://juu2tuupi.com',
    likes: 4,
    __v: 0
  },
  {
    _id: '5a444aa71b66a676234d17f8',
    title: 'Testi 4 titteli',
    author: 'Tittelin testaaja',
    url: 'http://juu3tuupi.com',
    likes: 1,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[4])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[5])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[6])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  .expect(200)
  .expect('Content-Type', /application\/json/)
  expect(response.body.length).toBe(initialBlogs.length)
})

test('id on id', async () => {
  const response = await api.get('/api/blogs')

  let contents = response.body.map(r => {
    return({
      'title': r.title,
      'author': r.author,
      'url': r.url,
      'likes': r.likes,
      'id': r.id
    })
  })
  contents.forEach(content => {
    expect(content.id).toBeDefined()
  })
})

test('a valid blog can be added ', async () => {
  const newBlog =  {
    title: 'Hermann Hesse',
    author: 'Tiivitaavin Seikkailut',
    url: 'http://kuukkeli.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(initialBlogs.length + 1)
})

test('url must not be missing', async () => {
  const newBlog =  {
    title: 'Hermann Hesse',
    author: 'Tiivitaavin Seikkailut',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('title must not be missing', async () => {
  const newBlog =  {
    author: 'Tiivitaavin Seikkailut',
    url: 'http://kuukkeli.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

test('likes = 0 if not set', async () => {
  const newBlog =  {
    title: 'Hermann Hesse',
    author: 'Tiivitaavin Seikkailut',
    url: 'http://kuukkeli.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    let contents = response.body.map(r => {
      return({
        'title': r.title,
        'author': r.author,
        'url': r.url,
        'likes': r.likes,
        'id': r.id
      })
    })
    let found = false
    contents.forEach(content => {
      if (content.title === newBlog.title) {
        expect(content.likes).toBe(0)
        found = true
      }
    })
    expect(found).toBe(true)
})

afterAll(() => {
  mongoose.connection.close()
})

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}