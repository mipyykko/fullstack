const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  console.log(user)

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(req.body.password, user.passwordHash)


  if (! (user && passwordCorrect)) {
    return res.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter