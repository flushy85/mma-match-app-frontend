import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data

}

const addFavorite = async (id, data) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.post(`${baseUrl}/${id}`, data, config)

  return res.data
}

const removeFavorite = async (id, data) => {
  const config = {
    headers: { Authorization: token }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config, data)

  return res.data
}




export default {
  getOne,
  addFavorite,
  removeFavorite,
  setToken
}