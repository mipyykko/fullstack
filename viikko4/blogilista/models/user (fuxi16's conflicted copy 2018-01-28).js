const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: String,
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }]
})

userSchema.static.format = new function(user) {
  return {
    id: user._id,
    username: user.username,
    name: user.name,
    blogs: user.blogs
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User

