/* eslint-disable react/prop-types */
import React, { Component } from 'react'
// import AuthService from '../services/auth-service'
import userService from '../../services/user-service'

export default class Profile extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentUser: undefined,
      id: this.props.match.param.id
    }
  }

  componentDidMount () {
    const user = userService.getOneUser(this.state.id)

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
                  <h2 align="center">Profile for {currentUser.username} :</h2>

                  <div>
                  <span>Images:</span>
                  {currentUser.images}
                  </div>

                  <div>
                  <span>Username:</span>
                  {currentUser.username}
                  </div>

                  <div>
                  <span>Firstname:</span>
                  {currentUser.firstname}
                  </div>

                  <div>
                  <span>Laststname:</span>
                  {currentUser.lastname}
                  </div>

                  <div>
                  <span>Email:</span>
                  {currentUser.email}
                  </div>

                  <div>
                  <span>Address:</span>
                  {currentUser.username}
                  </div>

                  <div>
                  <span>Rentals:</span>
                  {currentUser.username}
                  </div>

                  <div>
                  <span>Roles:</span>
                  {currentUser.roles}
                  </div>
              </div>

              )
            : (
              <h2 align="center">Signin to get the Dashboad</h2>
              )}

      </div>
    )
  }
}
