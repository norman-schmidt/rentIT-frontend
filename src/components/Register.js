/* eslint-disable react/prop-types */
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography
} from '@material-ui/core'
import { AccountCircle } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

// import { useSnackbar } from 'notistack'

import { isEmail } from 'validator'

import { register } from '../actions/auth'
import { CLEAR_MESSAGE } from '../actions/types'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    height: 80,
    width: 80,
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main
  },
  avatarIcon: {
    height: 'inherit',
    width: 'inherit'
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function SignUp (props) {
  const classes = useStyles()
  //   const { enqueueSnackbar } = useSnackbar()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [firstNameError, setFirstNameError] = useState(false)
  const [lastNameError, setLastNameError] = useState(false)
  const [addressError, setAddressError] = useState(false)
  const [pwdError, setPwdError] = useState(false)
  const [loading, setLoading] = useState(false)

  const { message } = useSelector((state) => state.message)
  const dispatch = useDispatch()

  const handleRegister = (e) => {
    e.preventDefault()

    setLoading(true)

    const registerCallback = register(email, password, lastName, firstName, address)
    registerCallback(dispatch)
      .then(() => {
        //   if (message) enqueueSnackbar(message, { variant: 'success' })
        props.history.push('/dashboard')
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    dispatch({
      type: CLEAR_MESSAGE
    })
  }, [])

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle className={classes.avatarIcon} />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form onSubmit={handleRegister} className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {firstNameError}
                helperText = {firstNameError ? 'The first name must have 3 - 20 characters' : ''}
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={(e) => { setFirstNameError(e.target.value.length < 3 || e.target.value.length > 20) }}
                onFocus={(e) => { setFirstNameError(false) }}
                id='firstName'
                label='First Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error = {lastNameError}
                helperText = {lastNameError ? 'The last name must have 3 - 20 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setLastName(e.target.value)}
                onBlur={(e) => { setLastNameError(e.target.value.length < 3 || e.target.value.length > 20) }}
                onFocus={() => { setLastNameError(false) }}
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {addressError}
                helperText = {addressError ? 'The address must have 3 - 20 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setAddress(e.target.value)}
                onBlur={(e) => { setAddressError(e.target.value.length < 3 || e.target.value.length > 20) }}
                onFocus={() => { setAddressError(false) }}
                id='adress'
                label='Adress'
                name='adress'
                autoComplete='address'
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
                error = {emailError}
                helperText = {emailError ? 'Please enter a valid Email Adress' : ''}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onBlur={() => { setEmailError(!isEmail(email)) }}
                onFocus={() => { setEmailError(false) }}
            />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error = {pwdError}
                helperText = {pwdError ? 'The password must have 6 - 40 characters' : ''}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => { setPwdError(e.target.value.length < 6 || e.target.value.length > 40) }}
                onFocus={() => { setPwdError(false) }}
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
              />
            </Grid>
          </Grid>
          {message && <Typography color='error' align="center">{message}</Typography>}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disabled={loading || firstNameError || lastNameError || addressError || emailError || pwdError}
          >
            Sign Up
          </Button>
          <Grid container justify='center'>
            <Grid item>
                <Typography variant="body2" align="center">
                    Already have an account?&nbsp;
                    <Link to="/login">
                        Login
                    </Link>
                </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}
