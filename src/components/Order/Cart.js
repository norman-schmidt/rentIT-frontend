import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Button, makeStyles, Grid } from '@material-ui/core'
import ArticleListItem from '../Articles/ArticleListItem'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    display: 'flex',
    margin: '20px auto',
    height: 50
  }
}))

const Cart = () => {
  const classes = useStyles()
  const [articles, setArticles] = useState([])
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    Axios({
      method: 'GET',
      // url: 'https://rentit-thb.herokuapp.com/api/articles/articlesByIds/',
      url: 'https://rentit-thb.herokuapp.com/api/categories/name/TV'
      // data: {
      //   ids: cart.items.map((item) => item.article.articleId)
      // }
    }).then(res => {
      console.log(res)
      setArticles(res.data)
    })
  }, [])
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
            {articles && articles.length > 0
              ? articles.map((article, index) => {
                  return (
                    <div key={index}>
                      <ArticleListItem article={article}></ArticleListItem>
                    </div>
                  )
                })
              : <Typography align='center'>Your cart is empty.</Typography>
            }
        </div>
  )
}

export default Cart
