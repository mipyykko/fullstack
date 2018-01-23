import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
}

const remove = (person) => {
    return axios.delete(baseUrl + '/' + person.id)
}

export default { getAll, create, remove }
