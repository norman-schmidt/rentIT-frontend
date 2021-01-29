/* eslint-disable default-param-last */
import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from '../actions/types'

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
        state.items.push({ article: { articleId: payload.articleId }, quantity: payload.quantity })
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

    default:
      return state
  }

  localStorage.setItem('cartItems', JSON.stringify(state))
  return state
}
