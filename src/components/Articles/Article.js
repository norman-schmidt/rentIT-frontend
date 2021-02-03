/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import axios from 'axios'

import { useDispatch } from 'react-redux'

import { Container, Grid, Button, Typography, FormControl, InputLabel, Select, MenuItem, makeStyles } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import { ADD_ITEM } from '../../actions/types'

const useStyles = makeStyles((theme) => ({
  article: {
    padding: '25px 50px 100px 50px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  skeleton: {
    margin: theme.spacing(2)
  },
  image: {
    maxWidth: '100%',
    maxHeight: 400,
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  information: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: 30,
      paddingTop: 40
    },
    paddingTop: 0
  },
  moreInformation: {
    paddingTop: 40
  },
  metaInfo: {
    paddingTop: 15
  },
  price: {
    marginTop: 50
  },
  priceButton: {
    marginTop: 20,
    width: '75%',
    height: 50
  },
  quantitySelect: {
    marginRight: theme.spacing(3),
    marginTop: 20,
    width: '15%',
    height: 40
  }
}))

function Article (props) {
  const classes = useStyles()
  const articleId = parseInt(props.match.params.article_id)

  const [article, setArticle] = useState({})
  const [quantity, setQuantity] = useState(1)

  const dispatch = useDispatch()

  useEffect(() => {
    axios.get('https://rentit-thb.herokuapp.com/api/articles/' + articleId)
      .then(res => {
        console.log(res.data)
        setArticle(res.data)
      })
  }, [])

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value)
  }

  const handleAddToCart = () => {
    dispatch({
      type: ADD_ITEM,
      payload: {
        articleId: articleId,
        quantity: quantity
      }
    })
  }

  return (
      <Container className={classes.article}>
        { article.articleId
          ? (
              <Grid container>
                  <Grid item xs={12} md={6} align="center">
                      <img src={article.images[0] ? article.images[0].imageLink : 'https://i.stack.imgur.com/GNhxO.png'} className={classes.image}></img>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.information}>
                      <Typography variant="h5">{article.name}</Typography>
                      <div className={classes.metaInfo}>
                          <Typography>Serial-No: {article.serialNumber}</Typography>
                          <Typography>Model: {article.model}</Typography>
                      </div>
                      <div>
                          <Typography className={classes.price} variant="h4">{article.price.toFixed(2).replace('.', ',')} €</Typography>
                          {article.stockLevel > 0 > 0
                            ? <div>
                                <FormControl className={classes.quantitySelect}>
                                  <InputLabel id="quantity-select-label">Qty.:</InputLabel>
                                  <Select
                                    labelId="quantity-select-label"
                                    id="quantity-select"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                  >
                                    {new Array(article.stockLevel).fill(0).map((v, i) => {
                                      return (
                                        <MenuItem key={i} value={(i + 1)}>{(i + 1)}</MenuItem>
                                      )
                                    })}
                                  </Select>
                                </FormControl>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.priceButton}
                                    endIcon={<ShoppingCartIcon />}
                                    onClick={handleAddToCart}
                                >
                                    Add to cart
                                </Button>
                              </div>
                            : <Button
                              disabled={true}
                              variant="contained"
                              color="disabled"
                              className={classes.priceButton}
                              endIcon={<ShoppingCartIcon />}
                              >
                                  Currently out of stock
                              </Button>
                          }
                        </div>
                  </Grid>
                  <Grid item xs={12} className={classes.moreInformation}>
                    <Typography paragraph>{article.description}</Typography>
                    <Typography variant="h5">Properties...</Typography>
                  </Grid>
              </Grid>
            )
          : (
              <Grid container>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton} variant="rect" height={300}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton} width="60%"/>
                  </Grid>
                  <Grid item xs={12}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                  </Grid>
              </Grid>
            )
        }
      </Container>
  )
}

export default Article
