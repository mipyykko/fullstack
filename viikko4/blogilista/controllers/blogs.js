const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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
    console.log(req.body)
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

blogsRouter.delete('/:id', async (req, res) => {
  try {
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