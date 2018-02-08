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

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = (newToken) => {
  token = newToken
}

export default { getAll, setToken, blogs }
