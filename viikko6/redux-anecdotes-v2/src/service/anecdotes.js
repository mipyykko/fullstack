import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const res = await axios.get(url)
  return res.data
}

const createNew = async (content) => {
  const res = await axios.post(url, { content, votes: 0 })
  return res.data
}

const vote = async (id) => {
  const res = await axios.get(`${url}/${id}`)
  const oldAnecdote = res.data
  const newAnecdote = { ...oldAnecdote, votes: oldAnecdote.votes + 1 }
  const res2 = await axios.put(`${url}/${id}`, newAnecdote)
  return res2.data

}
export default { getAll, createNew, vote }