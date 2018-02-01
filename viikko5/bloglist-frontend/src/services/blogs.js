import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

const create = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.post(baseUrl, blogObject, config)
  return res.data
}

const like = async (id) => {
  var likedBlog = await getById(id)

  if (likedBlog === null) return null

  likedBlog.likes++

  const res = await axios.put(`${baseUrl}/${id}`, likedBlog)
  return res.data
}

const remove = async (blogObject) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.delete(`${baseUrl}/${blogObject.id}`, blogObject, config)

  return res.data
}

export default { getById, getAll, setToken, create, like, remove }