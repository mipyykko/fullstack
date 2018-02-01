const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  res.json(blogs.map(Blog.format))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog
    .findById(req.params.id)

  if (blog === null) {
    return res.status(404).json({ error: 'wrong id' })
  }

  res.json(Blog.format(blog))
})

blogsRouter.post('/', async (req, res) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)

    if (!req.token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (req.body === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    if (req.body.title === undefined) {
      return res.status(400).json({ error: 'title missing' })
    }
    if (req.body.author === undefined) {
      return res.status(400).json({ error: 'author missing' })
    }
    if (req.body.url === undefined) {
      return res.status(400).json({ error: 'url missing' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({ ...req.body, user: user.id })

    const savedBlog = await blog.save()
    user.blogs = [ ...user.blogs, savedBlog._id ]
    await user.save()

    return res.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    if (exception.name === 'JsonWebTokenError') {
      res.status(401).json({ error: exception.message })
    } else {
      console.log(exception)
      res.status(500).json({ error: '??!' })
    }
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    let decodedToken

    if (req.token) {
      decodedToken = jwt.verify(req.token, process.env.SECRET)
    }
    const removableBlog = await Blog.findById(req.params.id)

    if (removableBlog.user !== undefined && // anonymous can be deleted
        ! (req.token && decodedToken &&
          removableBlog.user.toString() === decodedToken.id.toString())) {
      res.status(401).json({ error: 'unauthorized user' })
    }

    let removedBlog = await Blog.findByIdAndRemove(req.params.id)

    if (removedBlog.title === undefined) {
      // throws if nonexistent
    }

    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(400).send({ error: 'wrong id' })
  }
})

blogsRouter.put('/:id', async (req, res) => {
  try {
    const body = req.body

    const editBlog = {
      title: body.title,
      author: body.author,
      likes: body.likes
    }

    let editedBlog = await Blog.findByIdAndUpdate(req.params.id, editBlog, { new: true })

    if (editedBlog.title === undefined) {
      // throw
    }

    res.status(200).json(Blog.format(editedBlog))
  } catch (exception) {
    //console.log(exception)
    res.status(400).send({ error: 'wrong id' })
  }
})

module.exports = blogsRouter