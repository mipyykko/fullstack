import axios from 'axios'

const baseUrl = 'api/persons'
//http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

const remove = (person) => {
    return axios.delete(`${baseUrl}/${person.id}`)
}

export default { getAll, create, update, remove }
