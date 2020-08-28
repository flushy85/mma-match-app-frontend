import axios from 'axios'
const baseUrl = '/api/fighters'

const getAll = async () => {
  const res = await axios.get(`${baseUrl}`)
    return res.data
}

const getOne = async (name) => {
  const res = await axios.get(`${baseUrl}/${name}`)
    return res.data
}


export default {
  getAll,
  getOne,
}

