const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

// tests borked with login
let header
let dummyUser
let validToken

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  await User.remove({})

  const dummyUserObject = {
    username: 'dummy',
    name: 'dummy',
    password: 'password'
  }

  dummyUser = new User(dummyUserObject)
  dummyUser = await dummyUser.save()
  dummyUserObject.id = dummyUser._id

  validToken = await helper.validToken(dummyUserObject)
  header = await helper.createHeader(validToken)

})

describe('HTTP GET tests', async () => {
  test('all blogs are returned as json', async () => {
    const blogs = await helper.blogsInDb()

    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.length).toBe(blogs.length)

    const returnedTitles = res.body.map(blog => blog.title)
    blogs.forEach(blog => expect(returnedTitles).toContain(blog.title))
  })

  test('a specific blog is among the blogs', async () => {
    const blogs = await helper.blogsInDb()

    const titles = blogs.map(n => n.title)

    expect(titles).toContain('TDD harms architecture')
  })

  test('get with valid id returns right blog', async () => {
    const blogs = await helper.blogsInDb()

    const res = await api
      .get(`/api/blogs/${blogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(res.body.title).toEqual(blogs[0].title)
  })

  test('get with nonexistent id does not return anything', async () => {
    let nonexistent = await helper.nonExistentId()
    await api
      .get(`/api/blogs/${nonexistent}`)
      .expect(404)
  })
}, {})

describe('HTTP POST tests', async () => {

  beforeAll(async () => {
  })

  test('a valid blog can be added with valid token', async () => {
    try {
      const before = await helper.blogsInDb()

      let newBlog = {
        title: 'testTitle',
        author: 'testAuthor',
        url: 'http://url.url',
        likes: 0
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set(header)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const after = await helper.blogsInDb()

      const titles = after.map(t => t.title)
      expect(after.length).toEqual(before.length + 1)
      expect(titles).toContain('testTitle')
    } catch (exception) {
      console.log(exception)
    }
  })

  test('fails without a valid token', async () => {
    await api
      .post('/api/blogs')
      .send({}) // fails nevertheless before testing if empty
      .expect(401)
  })

  test('empty blog is not added with valid token', async () => {
    const before = await helper.blogsInDb()

    await api
      .post('/api/blogs')
      .send({})
      .set(header)
      .expect(400)

    const after = await helper.blogsInDb()

    expect(before.length).toBe(after.length)
  })

  test('blogs with missing key(s) are not added with ok token', async () => {

    const before = await helper.blogsInDb()

    let newBlog = {
      title: 'testTitle 2',
      author: 'testAuthor 2',
      url: 'http://url.url2'
    }

    let strippedBlogObjects = Object.keys(newBlog).map((key) => {
      let strippedBlog = { ...newBlog }
      delete strippedBlog[key]
      return strippedBlog
    })

    let promiseArray = await strippedBlogObjects.map(async (blog) => {
      await api
        .post('/api/blogs')
        .set(header)
        .send(blog)
        .expect(400)
    })

    Promise.all(promiseArray)

    const after = await helper.blogsInDb()

    expect(before.length).toBe(after.length)
  })

  test('likes initialized at 0', async () => {
    let newBlog = {
      title: 'testTitle 3',
      author: 'testAuthor 3',
      url: 'http:/url.url3'
    }

    const savedBlog = await api
      .post('/api/blogs')
      .set(header)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(savedBlog.body.likes).toEqual(0)
  })
}, {})

describe('HTTP DELETE tests', async () => {
  let addedBlog, addedBlog2, addedAnonymousBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'test to be deleted',
      author: 'testAuthor',
      url: 'http:/url.url',
      user: dummyUser
    })

    addedBlog2 = new Blog({
      title: 'test to be deleted 2',
      author: 'testAuthor',
      url: 'http:/url.url',
      user: dummyUser
    })

    addedAnonymousBlog = new Blog({
      title: 'anonymous to be deleted',
      author: 'asdv',
      url: 'http:/urly.url'
    })

    const blogObjects = [ addedBlog, addedBlog2, addedAnonymousBlog ]
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('delete with id succeeds with valid token', async () => {
    const before = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog.id}`)
      .set(header)
      .expect(204)

    const after = await helper.blogsInDb()

    const titles = after.map(blog => blog.title)

    expect(titles).not.toContain(addedBlog.title)
    expect(after.length).toBe(before.length - 1)
  })

  test('delete with id fails without token', async () => {
    const before = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog2.id}`)
      .expect(401)

    const after = await helper.blogsInDb()

    const titles = after.map(blog => blog.title)

    expect(titles).toContain(addedBlog2.title)
    expect(after.length).toBe(before.length)
  })

  test('delete succeeds with anonymous without token', async () => {
    const before = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${addedAnonymousBlog.id}`)
      .expect(204)

    const after = await helper.blogsInDb()

    const titles = after.map(blog => blog.title)

    expect(titles).not.toContain(addedAnonymousBlog.title)
    expect(after.length).toBe(before.length - 1)
  })

  test('delete with nonexistent id fails', async () => {
    const before = await helper.blogsInDb()

    const nonExistentId = await helper.nonExistentId()

    let res = await api
      .delete(`/api/blogs/${nonExistentId}`)
      .expect(400)

    const after = await helper.blogsInDb()

    expect(res.body.error).toBeDefined()
    expect(after.length).toBe(before.length)
  })
}, {})

describe('HTTP PUT tests', async () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog({
      title: 'test to be edited',
      author: 'testAuthor',
      url: 'http:/url.url',
      likes: 0
    })
    addedBlog = await addedBlog.save()
  })

  test('put with correct id succeeds', async () => {

    const before = await helper.blogsInDb()

    let updatedBlog = { ...addedBlog._doc, likes: addedBlog.likes + 1 }

    let res = await api
      .put(`/api/blogs/${addedBlog._id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const after = await helper.blogsInDb()

    expect(res.body.likes).toEqual(addedBlog.likes + 1)
    expect(after.length).toEqual(before.length)
  })

  test('put with incorrect id fails', async () => {
    let originalCopy = await api
      .get(`/api/blogs/${addedBlog._id}`)

    let updatedBlog = { ...originalCopy.body._doc, likes: originalCopy.body.likes + 1 }

    let nonexistent = await helper.nonExistentId()

    let res = await api
      .put(`/api/blogs/${nonexistent}`)
      .send(updatedBlog)
      .expect(400)

    expect(res.body.error).toBeDefined()

    let updatedCopy = await api
      .get(`/api/blogs/${addedBlog._id}`)

    expect(originalCopy.body.likes).toEqual(updatedCopy.body.likes)
  })
}, {})

afterAll(() => {
  server.close()
})

