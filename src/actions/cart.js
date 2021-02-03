import { ADD_ITEM, DELETE_ITEM, REMOVE_ITEM, CHANGE_DATE, CHANGE_QUANTITY } from './types'

export const addItem = (articleId, quantity) => ({
  type: ADD_ITEM,
  payload: {
    articleId: articleId,
    quantity: quantity
  }
})

export const changeQuantity = (articleId, quantity) => ({
  type: CHANGE_QUANTITY,
  payload: {
    articleId: articleId,
    quantity: quantity
  }
})

export const changeReturnDate = (articleId, newDate) => ({
  type: CHANGE_DATE,
  payload: {
    articleId: articleId,
    returnDate: newDate
  }
})

export const removeItem = (articleId) => ({
  type: REMOVE_ITEM,
  payload: { articleId: articleId }
})

export const deleteItem = (articleId) => ({
  type: DELETE_ITEM,
  payload: { articleId: articleId }
})
