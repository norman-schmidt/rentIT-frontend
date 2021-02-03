import React, { useEffect, useState } from 'react'
import ArticleListItem from '../Articles/ArticleListItem'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, makeStyles, Grid, MenuItem, Select, InputLabel, FormControl, Paper } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Axios from 'axios'
import { CHANGE_DATE, CHANGE_QUANTITY } from '../../actions/types'
import Skeleton from '@material-ui/lab/Skeleton'

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    display: 'flex',
    margin: '20px auto',
    height: 50
  },
  dateAndQuantity: {
    display: 'flex',
    padding: 30,
    marginTop: -10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantitySelect: {
    marginRight: 20
  }
}))

const Cart = () => {
  const classes = useStyles()
  const [articles, setArticles] = useState([])
  const cart = useSelector(state => state.cart)
  const [dates, setDates] = useState(cart.items.map((item) => item.returnDate))
  const dispatch = useDispatch()

  useEffect(() => {
    Axios({
      method: 'POST',
      url: 'https://rentit-thb.herokuapp.com/api/articles/articlesByIds/',
      data: {
        ids: cart.items.map((item) => item.article.articleId)
      }
    }).then(res => {
      console.log(res.data)
      setArticles(res.data)
    })
  }, [])

  const handleQuantityChange = (articleId, event) => {
    dispatch({
      type: CHANGE_QUANTITY,
      payload: {
        articleId: articleId,
        quantity: event.target.value
      }
    })
  }

  const handleDateChange = (articleId, newDate, index) => {
    console.log(newDate)
    dispatch({
      type: CHANGE_DATE,
      payload: {
        articleId: articleId,
        returnDate: newDate
      }
    })
    console.log(cart.items[0].returnDate)
    dates[index] = cart.items[index].returnDate
    setDates(dates)
  }

  return (
        <div>
            {cart && cart.items.length > 0
              ? <div>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6} align="center">
                      <Typography variant='h5'>Total: </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button className={classes.checkoutButton} variant="contained" color="primary"endIcon={<ArrowForwardIosIcon />}>Proceed to Checkout</Button>
                    </Grid>
                  </Grid>
                  {articles && articles.length > 0
                    ? articles.map((article, index) => {
                        return (
                          <div key={index}>
                            {article
                              ? <div>
                                  <ArticleListItem article={article}></ArticleListItem>
                                  <Paper square variant='outlined' className={classes.dateAndQuantity}>
                                    <FormControl className={classes.quantitySelect}>
                                      <InputLabel id="quantity-select-label">Qty.:</InputLabel>
                                      <Select
                                        labelId="quantity-select-label"
                                        id="quantity-select"
                                        value={cart.items[index].quantity}
                                        onChange={(event) => handleQuantityChange(article.id, event)}
                                      >
                                        {new Array(article.stockLevel).fill(0).map((v, i) => {
                                          return (
                                            <MenuItem key={i} value={(i + 1)}>{(i + 1)}</MenuItem>
                                          )
                                        })}
                                      </Select>
                                    </FormControl>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                      <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="dd/MM/yyyy"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={dates[index]}
                                        onChange={(newDate) => { handleDateChange(article.id, newDate, index) }}
                                        KeyboardButtonProps={{
                                          'aria-label': 'change date'
                                        }}
                                      />
                                    </MuiPickersUtilsProvider>
                                  </Paper>
                                </div>
                              : <div></div>
                            }
                          </div>
                        )
                      })
                    : <div>
                        {Array(30).fill(0).map((a, i) => {
                          return (
                            <Skeleton key={i} className={classes.skeleton} variant="rect"/>
                          )
                        })}
                      </div>
                    }
                  </div>
              : <Typography align='center'>Your cart is empty.</Typography>
            }
        </div>
  )
}

export default Cart
