const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/reset', async (req, res) => {
  await User.remove({})
})

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
  res.json(users.map(User.format))
})

usersRouter.get('/:id', async (req, res) => {
  const user = await User
    .findById(req.params.id)
  res.json(User.format(user))
})

usersRouter.post('/', async (req, res) => {
  try {
    const body = req.body

    if (body.username === undefined) {
      return res.status(400).json({ error: 'username missing ' })
    }
    if (body.password === undefined) {
      return res.status(400).json({ error: 'password missing' })
    }

    if (body.password.length < 3) {
      return res.status(400).json({ error: 'password too short (min: 3)' })
    }
    const unique = await User.findOne({ username: body.username })

    if (unique !== null) {
      return res.status(400).json({ error: 'username already in use' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUser = await user.save()

    res.json(savedUser)
  } catch (exception ) {
    console.log(exception)
    res.status(500).json({ error: '??!' })
  }
})

module.exports = usersRouter