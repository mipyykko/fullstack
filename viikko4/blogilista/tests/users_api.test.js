const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe.only('only one user in db', async () => {
  let rootUser

  beforeAll(async() => {
    await User.remove({})

    rootUser = new User({ username: 'root', name: 'rooty', password: 'password' })
    await rootUser.save()
  })

  test('GET returns user', async () => {
    const res = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const users = res.body.map(u => u.name)

    expect(users).toContain(rootUser.name)
  })

  test('POST succeeds with new username', async () => {
    const before = await helper.usersInDb()

    const newUser = {
      username: 'test',
      name: 'testing',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const after = await helper.usersInDb()

    expect(after.length).toBe(before.length + 1)

    const usernames = after.map(u => u.username)

    expect(usernames).toContainEqual(newUser.username)
  })
})

afterAll(() => {
  server.close()
})