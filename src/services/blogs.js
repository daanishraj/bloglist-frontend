import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (payload) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.post(baseUrl, payload, config)
  return request.then(response => response.data)
}

const updateLikes = (payload, blogId) => {
  const request = axios.put(`${baseUrl}/${blogId}`, payload)
  return request.then(response => response.data)
}

const remove = (blogId) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.delete(`${baseUrl}/${blogId}`, config)
  return request.then(response => response)
}

export default { getAll, create, updateLikes, setToken, remove }