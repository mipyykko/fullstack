const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

blogSchema.statics.format = function(blog) {
  const newBlog = { ...blog._doc, id: blog._id }
  delete newBlog._id
  delete newBlog.__v

  return newBlog
}

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog

