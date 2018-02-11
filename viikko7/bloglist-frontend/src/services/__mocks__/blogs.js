let token = null

const blogs = [
  {
    id: 'abcdef56',
    title: 'asdf fdfdf',
    author: 'hhhhh6',
    url: 'http://vuf.huh',
    likes: '63',
    user: {
      _id: 'fdedf2',
      username: 'miuu',
      name: 'orrrg'
    }
  }
]

const create = (blog) => {
  return Promise.resolve(blog)
}

const remove = (blog) => {
  return Promise.resolve(blog)
}

const like = (id) => {
  const blog = getById(id)
  return { ...blog, likes: blog.likes + 1 }
}

const getById = (id) => {
  const blog = blogs.find(blog => id === blog.id)
  return blog
}


const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
}

export default { getAll, setToken, blogs, create, remove, like }
