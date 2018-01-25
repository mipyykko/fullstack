const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs.map(Blog.format))
    })
})

blogsRouter.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog
    .save()
    .then(savedBlog => {
      res.status(201).json(Blog.format(savedBlog))
    })
})

module.exports = blogsRouter