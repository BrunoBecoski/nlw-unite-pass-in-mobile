import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.22.29:3333',
})
