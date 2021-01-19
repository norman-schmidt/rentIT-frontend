import React, { Component } from 'react'
import AuthService from '../../services/auth-service'

export default class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentUser: undefined
    }
  }

  componentDidMount () {
    const user = AuthService.getCurrentUser()

    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  render () {
    const { currentUser } = this.state

    return (
      <div>

          {currentUser
            ? (
              <div>
                <h2 align="center">Dashboard for {currentUser.username}</h2>
                <p>Email: {currentUser.email} </p>
                <p>Roles: {currentUser.roles} </p>
              </div>
              )
            : (
              <h2 align="center">Loggin to get the Dashboad</h2>
              )}

      </div>
    )
  }
}
