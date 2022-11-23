import axios from 'axios'
import queryString from 'query-string'
import { apiConfig } from './apiConfig'

const axiosCient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify({ ...params, api_key: apiConfig.apiKey }),
  }
})

axiosCient.interceptors.request.use(async (config) => config)

axiosCient.interceptors.response.use(
  (response) => {
    if (response && response.data) return response.data

    return response
  },
  (err) => {
    throw err
  }
)

export { axiosCient }
