/* eslint-disable default-param-last */
import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM, CHANGE_DATE, CHANGE_QUANTITY, CLEAR_CART } from '../actions/types'

const initialState = JSON.parse(localStorage.getItem('cartItems')) ?? { items: [] }

export default function (state = initialState, action) {
  console.log(state)
  if (action === undefined) return state

  const { type, payload } = action

  let itemIndex
  if (payload !== undefined) {
    itemIndex = state.items.findIndex((i) => {
      return i.article.articleId === payload.articleId
    })
  }

  switch (type) {
    case ADD_ITEM:
      if (itemIndex > -1) {
        state.items[itemIndex].quantity += payload.quantity
      } else {
        state.items.push({ article: { articleId: payload.articleId }, quantity: payload.quantity, returnDate: new Date(new Date().getTime() + 604800000) })
      }
      break

    case CHANGE_QUANTITY:
      if (itemIndex > -1) {
        state.items[itemIndex].quantity = payload.quantity
      }
      break

    case CHANGE_DATE:
      if (itemIndex > -1) {
        state.items[itemIndex].returnDate = payload.returnDate
      }
      break

    case REMOVE_ITEM:
      if (itemIndex > -1 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity--
      } else {
        state = {
          items: state.items.filter((item) => {
            return item.article.articleId !== payload.articleId
          })
        }
      }
      break

    case DELETE_ITEM:
      state = {
        items: state.items.filter((item) => {
          return item.article.articleId !== payload.articleId
        })
      }
      break

    case CLEAR_CART:
      state = { items: [] }
      break

    default:
      return state
  }

  localStorage.setItem('cartItems', JSON.stringify(state))
  return state
}
