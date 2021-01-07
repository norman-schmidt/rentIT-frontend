import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'http://localhost:8080/api/articles/'
const USERS_API = 'http://localhost:8080/api/users/'

class UserService {
  getPublicContent () {
    return axios.get(API_URL)
  }

  getUserBoard () {
    return axios.get(API_URL + 'user', { headers: authHeader() })
  }

  getOneUser (id) {
    return axios.get(USERS_API + id)
  }
}

export default new UserService()
