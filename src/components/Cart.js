import React from 'react'
import { useSelector } from 'react-redux'
import { Typography } from '@material-ui/core'
import ArticleListItem from './Articles/ArticleListItem'

const Cart = () => {
  const cart = useSelector(state => state.cart)

  console.log(cart)

  return (
        <div>
            {cart && cart.items.length > 0
              ? cart.items.map((item, index) => {
                  return (
                        <ArticleListItem key={index} articleId={item.articleId}></ArticleListItem>
                  )
                })
              : <Typography align='center'>Your cart is empty.</Typography>
            }
        </div>
  )
}

export default Cart
