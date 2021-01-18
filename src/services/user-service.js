import axios from 'axios'
import authHeader from './auth-header'

const API_URL = 'https://rentit-thb.herokuapp.com/api/'
const USERS_API = 'https://rentit-thb.herokuapp.com/api/user/'

class UserService {
  getPublicContent () {
    return axios.get(API_URL)
  }

  getUserBoard () {
    return axios.get(USERS_API, { headers: authHeader() })
  }

  getOneUser (id) {
    return axios.get(USERS_API + id)
  }
}

export default new UserService()
