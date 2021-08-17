import axios from 'axios'

const client = axios.create()

export function applyToken(token) {
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default client
