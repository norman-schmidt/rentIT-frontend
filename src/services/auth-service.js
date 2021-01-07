import axios from 'axios'

const API_URL = 'https://rentit-thb.herokuapp.com/api/auth/'

class AuthService {
  login (username, password) {
    return axios
      .post(API_URL + 'signin', {
        username,
        password
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

  register (email, username, password, lastname, firstname, address, birthday) {
    return axios.post(API_URL + 'signup', {
      email,
      username,
      password,
      lastname,
      firstname,
      address,
      birthday
    })
  }

  getCurrentUser () {
    return JSON.parse(localStorage.getItem('user'))
  }
}

export default new AuthService()
