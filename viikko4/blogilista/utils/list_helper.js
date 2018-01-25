const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, [])
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}