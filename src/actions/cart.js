import { ADD_ITEM, DELETE_ITEM, REMOVE_ITEM } from './types'

export const addItem = (articleId, amount) => ({
  type: ADD_ITEM,
  payload: {
    articleId: articleId,
    amount: amount
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
