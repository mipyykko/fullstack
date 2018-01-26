const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs.map(Blog.format))
})

blogsRouter.post('/', async (req, res) => {
  try {
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

    const blog = new Blog(req.body)

    const savedBlog = await blog.save()
    return res.status(201).json(Blog.format(savedBlog))
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: '??!' })
  }
})

module.exports = blogsRouter