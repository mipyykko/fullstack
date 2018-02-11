const users = [{
  id: '1234',
  username: 'testing',
  name: 'testing',
  adult: 'true',
  blogs: []
}]

const getAll = () => {
  return Promise.resolve(users)
}

export default { getAll }