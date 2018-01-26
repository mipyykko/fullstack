const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr, [])
}

const mostBlogs = (blogs) => {
  const blogsByAuthor = blogs.reduce((blogs, blog) => {
    if (blog.author in blogs) {
      blogs[blog.author]++
    } else {
      blogs[blog.author] = 1
    }
    return blogs
  }, {})

  const author = Object.keys(blogsByAuthor)
    .reduce((prev, curr) => blogsByAuthor[prev] > blogsByAuthor[curr] ?
      prev : curr, {})

  return author.length > 0 ? { author, blogs: blogsByAuthor[author] } : {}
}

const mostLikes = (blogs) => {
  const likesByAuthor = blogs.reduce((likes, blog) => {
    if (blog.author in likes) {
      likes[blog.author] += blog.likes
    } else {
      likes[blog.author] = blog.likes
    }

    return likes
  }, {})

  const author = Object.keys(likesByAuthor)
    .reduce((prev, curr) => likesByAuthor[prev] > likesByAuthor[curr] ?
      prev : curr, {})

  return author.length > 0 ? { author, likes: likesByAuthor[author] } : {}
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}