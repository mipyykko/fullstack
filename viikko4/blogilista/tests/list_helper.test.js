const listHelper = require('../utils/list_helper')

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

const listWithSeveralBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithSameLikesAndAuthor = [
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 2,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const listWithSameNumberOfAuthorsAndLikes = [
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 12,
    __v: 0
  }
]

const emptyList = []

test('dummy is called', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('when list is empty, there should be zero likes', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs, likes are correct', () => {
    const result = listHelper.totalLikes(listWithSeveralBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('when list is empty, there should be nothing', () => {
    const result = listHelper.favoriteBlog(emptyList)
    expect(result).toEqual([])
  })

  test('when list has only one blog, it should return that', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })

  test('when list has several blogs, it should return one with most likes', () => {
    const result = listHelper.favoriteBlog(listWithSeveralBlogs)
    expect(result).toEqual(listWithSeveralBlogs[2])
  })

  test('when list has blogs with equal highest likes, it should return anyone', () => {
    const result = listHelper.favoriteBlog(listWithSameLikesAndAuthor)
    expect(result).toEqual(expect.objectContaining({ likes: 2 }))
  })
})

describe('most blogs', () => {
  test('when list is empty, there should be nothing', () => {
    const result = listHelper.mostBlogs(emptyList)
    expect(result).toEqual({})
  })

  test('when list has only one blog, it should return the author of that one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result.author).toEqual(listWithOneBlog[0].author)
  })

  test('when list has several blogs, it should return the author with most blogs', () => {
    const result = listHelper.mostBlogs(listWithSeveralBlogs)
    expect(result.author).toEqual('Robert C. Martin')
  })

  test('when list has blogs with same amount of authors, it should return anyone', () => {
    const result = listHelper.mostBlogs(listWithSameNumberOfAuthorsAndLikes)
    expect(result.author).toEqual({ 
      asymmetricMatch: actual => actual === 'Edsger W. Dijkstra' || 
        actual === 'Robert C. Martin'
      })
  })
})

describe('most likes', () => {
  test('when list is empty, there should be nothing', () => {
    const result = listHelper.mostLikes(emptyList)
    expect(result).toEqual({})
  })

  test('when list has only one blog, it should return the author and likes of that one', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result)
      .toEqual({ author: listWithOneBlog[0].author, likes: listWithOneBlog[0].likes })
  })

  test('when the list has only one author, it should return the author and combined likes', () => {
    const result = listHelper.mostLikes(listWithSameLikesAndAuthor)
    expect(result)
      .toEqual({ author: 'Robert C. Martin', likes: 4 })
  })

  test('when list has several authors, it should return the author with most likes', () => {
    const result = listHelper.mostLikes(listWithSeveralBlogs)
    expect(result.author).toEqual('Edsger W. Dijkstra')
    expect(result.likes).toBe(17)
  })

  test('when list has authors with same amount of likes, it should return anyone', () => {
    const result = listHelper.mostLikes(listWithSameNumberOfAuthorsAndLikes)
    expect(result.author).toEqual({ 
      asymmetricMatch: actual => actual === 'Edsger W. Dijkstra' || 
        actual === 'Robert C. Martin'
      })
    expect(result.likes).toEqual(12)
  })
})