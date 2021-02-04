import React, { useEffect, useState } from 'react'
import ArticleListItem from '../Articles/ArticleListItem'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Button, makeStyles, Grid, MenuItem, Select, InputLabel, FormControl, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import differenceInDays from 'date-fns/differenceInDays'
import sub from 'date-fns/sub'
import add from 'date-fns/add'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Axios from 'axios'
import { CHANGE_RENTALDATE, CHANGE_QUANTITY, CHANGE_RETURNDATE, CLEAR_CART } from '../../actions/types'
import Skeleton from '@material-ui/lab/Skeleton'
import authHeader from '../../services/auth-header'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  checkoutButton: {
    display: 'flex',
    margin: '20px auto',
    height: 50
  },
  article: {
    marginTop: 50
  },
  dateAndQuantity: {
    display: 'flex',
    padding: 30,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
}))

const Cart = () => {
  const classes = useStyles()
  const { isLoggedIn } = useSelector(state => state.auth)
  const history = useHistory()
  const [open, setOpen] = useState(false)
  const [articles, setArticles] = useState([])
  const [total, setTotal] = useState(0)

  var cart
  const calculateTotal = () => {
    if (cart && articles.length > 0) {
      let sum = 0
      cart.items.forEach((item, index) => {
        // console.log(articles[index].price + ' * ' + item.quantity + ' * ' + new Date(item.rentalDate) + ' - ' + item.returnDate + ' = ' + differenceInDays(new Date(item.returnDate), new Date(item.rentalDate)))
        sum += articles[index].price * item.quantity * (differenceInDays(new Date(item.returnDate), new Date(item.rentalDate)))
      })
      setTotal(sum)
    }
  }
  cart = useSelector(state => {
    calculateTotal()
    return state.cart
  })

  const dispatch = useDispatch()

  useEffect(() => {
    Axios({
      method: 'POST',
      url: 'https://rentit-thb.herokuapp.com/api/articles/articlesByIds/',
      data: {
        ids: cart.items.map((item) => item.article.articleId)
      }
    }).then(res => {
      setArticles(res.data.filter((article) => article))
    })
  }, [])

  useEffect(calculateTotal, [articles])

  const rent = () => {
    console.log(cart.items)
    Axios({
      method: 'POST',
      url: 'https://rentit-thb.herokuapp.com/api/quantities/',
      data: cart.items,
      headers: authHeader()
    }).then(res => {
      console.log(res.data)
      dispatch({
        type: CLEAR_CART
      })
    })
  }

  const handleQuantityChange = (articleId, event) => {
    dispatch({
      type: CHANGE_QUANTITY,
      payload: {
        articleId: articleId,
        quantity: event.target.value
      }
    })
  }

  const handleRentalDateChange = (articleId, newDate) => {
    dispatch({
      type: CHANGE_RENTALDATE,
      payload: {
        articleId: articleId,
        rentalDate: newDate
      }
    })
  }

  const handleReturnDateChange = (articleId, newDate) => {
    dispatch({
      type: CHANGE_RETURNDATE,
      payload: {
        articleId: articleId,
        returnDate: newDate
      }
    })
  }

  return (
        <div>
            {cart && cart.items.length > 0
              ? <div>
                  <Grid container justify="center" alignItems="center">
                    <Grid item xs={12} md={6} align="center">
                      <Typography variant='h5'>Total: {total}€</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button className={classes.checkoutButton} onClick={() => setOpen(true)} variant="contained" color="primary"endIcon={<ArrowForwardIosIcon />}>Proceed to Checkout</Button>
                      {isLoggedIn
                        ? <Dialog
                            fullWidth={true}
                            maxWidth='sm'
                            open={open}
                            onClose={() => setOpen(false)}
                          >
                            <DialogTitle id="confirmation-dialog">Ready to rent?</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                                You will rent {cart.length} and pay a total of {total}€.
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => { rent(); setOpen(false) }} color="primary">
                                Rent Now
                              </Button>
                            </DialogActions>
                          </Dialog>
                        : <Dialog
                            fullWidth={true}
                            maxWidth='sm'
                            open={open}
                            onClose={() => setOpen(false)}
                          >
                            <DialogTitle id="confirmation-dialog">Please log in or register to rent your articles.</DialogTitle>
                            <DialogContent>
                              <DialogContentText>
                               You need an account to rent your articles from RENTIT24. 👾
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={() => { history.push('/login') }} color="primary">
                                Login
                              </Button>
                              <Button onClick={() => { history.push('/register') }} color="primary">
                                Register
                              </Button>
                            </DialogActions>
                          </Dialog>
                      }
                    </Grid>
                  </Grid>
                  {articles && articles.length > 0
                    ? articles.map((article, index) => {
                        return (
                          <div key={index}>
                            {article
                              ? <div className={classes.article}>
                                  <ArticleListItem article={article}></ArticleListItem>
                                  <Paper square variant='outlined' className={classes.dateAndQuantity}>
                                    <Grid container direction="row" justify="center" alignItems="center" spacing={2}>
                                      <Grid item xs={12} sm={2} align='center'>
                                        <FormControl>
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
                                      </Grid>
                                      <Grid item xs={5} sm={3} align='center'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <KeyboardDatePicker
                                            disableToolbar
                                            disablePast
                                            maxDate={ sub(new Date(cart.items[index].returnDate), { days: 1 }) }
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            id="date-picker-inline"
                                            label="Rental Date"
                                            value={cart.items[index].rentalDate}
                                            onChange={(newDate) => { handleRentalDateChange(article.id, newDate) }}
                                            KeyboardButtonProps={{
                                              'aria-label': 'change date'
                                            }}
                                          />
                                        </MuiPickersUtilsProvider>
                                      </Grid>
                                      <Grid item xs={2} sm={2} align='center'>
                                        <Typography variant="body1">{differenceInDays(new Date(cart.items[index].returnDate), new Date(cart.items[index].rentalDate)) > 0 ? differenceInDays(new Date(cart.items[index].returnDate), new Date(cart.items[index].rentalDate)) + ' Day(s)' : ''}</Typography>
                                      </Grid>
                                      <Grid item xs={5} sm={3} align='center'>
                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                          <KeyboardDatePicker
                                            disableToolbar
                                            disablePast
                                            minDate={add(new Date(), { days: 1 })}
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            id="date-picker-inline"
                                            label="Return Date"
                                            value={cart.items[index].returnDate}
                                            onChange={(newDate) => { handleReturnDateChange(article.id, newDate) }}
                                            KeyboardButtonProps={{
                                              'aria-label': 'change date'
                                            }}
                                          />
                                        </MuiPickersUtilsProvider>
                                      </Grid>
                                      <Grid item xs={12} sm={2} align='center'>
                                        <Typography variant="body1">{differenceInDays(new Date(cart.items[index].returnDate), new Date(cart.items[index].rentalDate)) > 0 ? '= ' + (articles[index].price * cart.items[index].quantity * (differenceInDays(new Date(cart.items[index].returnDate), new Date(cart.items[index].rentalDate)))) + '€' : ''}</Typography>
                                      </Grid>
                                    </Grid>
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