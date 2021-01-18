import axios from 'axios'

const API_URL = 'https://rentit-thb.herokuapp.com/api/auth/'

class AuthService {
  login (email, password) {
    return axios
      .post(API_URL + 'signin', {
        username: email,
        password: password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (email, password, lastname, firstname, address) {
    return axios.post(API_URL + 'signup', {
      email,
      username: email,
      password,
      lastname,
      firstname,
      address,
      role: []
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()