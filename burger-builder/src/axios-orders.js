import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://fir-demoharoon.firebaseio.com/'
})

export default instance