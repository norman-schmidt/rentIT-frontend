/* eslint-disable react/prop-types */
import { Button, Divider, Grid, makeStyles, Typography } from '@material-ui/core'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import AuthService from '../../services/auth-service'
import authHeader from '../../services/auth-header'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    fontWeight: 'bold'
  }
}))

function Dashboard () {
  const classes = useStyles()
  const [user, setUser] = useState(null)
  const { isLoggedIn } = useSelector(state => state.auth)
  const [rentedArticles, setRentedArticles] = useState([])

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      Axios.get('https://rentit-thb.herokuapp.com/api/quantities/listRental/', { headers: authHeader() })
        .then(res => {
          setRentedArticles(res.data)
        })
    }
  }, [])

  const handleReturn = (articleQuantityId) => {
    Axios({
      method: 'POST',
      url: 'https://rentit-thb.herokuapp.com/api/quantities/return/',
      data: {
        ids: [articleQuantityId]
      },
      headers: authHeader()
    }).then(res => {
      Axios.get('https://rentit-thb.herokuapp.com/api/quantities/listRental/', { headers: authHeader() })
        .then(res => {
          setRentedArticles(res.data)
        })
    })
  }

  return (
    <div>
        {user && isLoggedIn
          ? (
            <div>
              <Typography variant='h4' align="center">Hi, {user.firstname} {user.lastname} 👋</Typography>
              {rentedArticles.length > 0
                ? <div>
                    <Typography variant='h6' align="center">Here is an overview of your rented items:</Typography>
                    <Grid classname={classes.tableHeader} container spacing={2} alignItems='center' justify='center' align='center'>
                      <Grid item xs={6} md={2}>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant='body1'>Name and Description</Typography>
                      </Grid>
                      <Grid item xs={4} md={1}>
                        <Typography variant='body2' >Qty.</Typography>
                      </Grid>
                      <Grid item xs={4} md={2}>
                        <Typography variant='body2' >Rent Date</Typography>
                      </Grid>
                      <Grid item xs={4} md={1}>
                        <Typography variant='body2' >Return Date</Typography>
                      </Grid>
                      <Grid item xs={6} md={2}>
                        <Typography variant='body2' >Extend</Typography>
                      </Grid>
                      <Grid item xs={6} md={1}>
                        <Typography variant='body2' >Return</Typography>
                      </Grid>
                    </Grid>
                    {rentedArticles.map((article, index) => {
                      return (
                        <div key={index}>
                          <Grid container spacing={2} alignItems='center' justify='center' align='center'>
                            <Grid item xs={6} md={2}>
                              <img src={article.imageLink} height='auto' width='100%'/>
                            </Grid>
                            <Grid item xs={6} md={2}>
                              <Typography variant='body1' paragraph>{article.name}</Typography>
                              <Typography variant='body2' >{article.description}</Typography>
                            </Grid>
                            <Grid item xs={4} md={1}>
                              <Typography variant='body2' >{article.quantity}</Typography>
                            </Grid>
                            <Grid item xs={4} md={2}>
                              <Typography variant='body2' >{article.rent_date.substr(0, 10).replaceAll('-', '.')}</Typography>
                            </Grid>
                            <Grid item xs={4} md={1}>
                              <Typography variant='body2' >{article.return_date ? article.return_date.substr(0, 10).replaceAll('-', '.') : '-'}</Typography>
                            </Grid>
                            <Grid item xs={6} md={2}>
                              <Button variant="contained" color='primary'>
                                Extend
                              </Button>
                            </Grid>
                            <Grid item xs={6} md={1}>
                              <Button variant="contained" color='secondary' onClick={() => handleReturn(article.article_quantityId)}>
                                Return
                              </Button>
                            </Grid>
                          </Grid>
                          <Divider></Divider>
                        </div>
                      )
                    })}
                  </div>
                : <Typography variant='h6' align="center">You currently have no rentals.</Typography>}
            </div>
            )
          : (
              <Typography variant='h5' align="center">Please log in or create an account to see your Dashboard.</Typography>
            )}

    </div>
  )
}

export default Dashboard
