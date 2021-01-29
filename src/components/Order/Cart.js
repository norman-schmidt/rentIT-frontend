import React from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button, makeStyles, Grid } from '@material-ui/core'
import ArticleListItem from '../Articles/ArticleListItem'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    display: 'flex',
    margin: '20px auto',
    height: 50
  }
}))

const Cart = () => {
  const classes = useStyles()
  const cart = useSelector(state => state.cart)

  return (
        <div>
            {cart && cart.items.length > 0
              ? <Grid container justify="center" alignItems="center">
                  <Grid item xs={12} md={6} align="center">
                    <Typography variant='h5'>Total: </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Button className={classes.checkoutButton} variant="contained" color="primary"endIcon={<ArrowForwardIosIcon />}>Proceed to Checkout</Button>
                  </Grid>
                </Grid>
              : <div></div>
            }
            {cart && cart.items.length > 0
              ? cart.items.map((item, index) => {
                  return (
                    <div key={index}>
                      <ArticleListItem article={{ name: 'Hallo', price: 100.0, stockLevel: 20, description: 'Nice alter', imageLink: 'https://brain-images-ssl.cdn.dixons.com/2/1/10192712/u_10192712.jpg' }}></ArticleListItem>
                    </div>
                  )
                })
              : <Typography align='center'>Your cart is empty.</Typography>
            }
        </div>
  )
}

export default Cart
