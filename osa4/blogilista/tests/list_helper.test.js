const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(bigList)
    expect(result).toBe(43)
  })
})

describe('favorite blog', () => {
  
  test('works with one', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('favorite blog is found correctly', () => {
    const result = listHelper.favoriteBlog(bigList)
    expect(result).toEqual(bigList[3])
  })
})

describe('most blogs', () => {
  
  test('works with one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const entry = {
      'author': 'Edsger W. Dijkstra',
      'count': 1
    }
    expect(result).toEqual(entry)
  })
  
  test('author with most blogs is found correctly', () => {
    const result = listHelper.mostBlogs(bigList)
    const entry = {
      'author': 'Tittelin testaaja',
      'count': 4
    }
    expect(result).toEqual(entry)
  })
})

describe('most likes', () => {
  
  test('works with one', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    const entry = {
      'author': 'Edsger W. Dijkstra',
      'likes': 5
    }
    expect(result).toEqual(entry)
  })
  
  test('author with most blogs is found correctly', () => {
    const result = listHelper.mostLikes(bigList)
    const entry = {
      'author': 'yks tyyppi',
      'likes': 23
    }
    expect(result).toEqual(entry)
  })
})


const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const bigList = [
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