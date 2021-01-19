/* eslint-disable default-param-last */
import { ADD_ITEM, REMOVE_ITEM, DELETE_ITEM } from '../actions/types'

const initialState = { items: [] }

export default function (state = initialState, action) {
  if (action === undefined) return state

  const { type, payload } = action

  const itemIndex = state.items.findIndex((i) => {
    return i.articleId === payload.articleId
  })

  switch (type) {
    case ADD_ITEM:
      if (itemIndex > -1) {
        state.items[itemIndex].amount += payload.amount
        return state
      } else {
        state.items.push({ articleId: payload.articleId, amount: payload.amount })
        return state
      }

    case REMOVE_ITEM:
      if (itemIndex > -1 && state.items[itemIndex].amount > 1) {
        state.items[itemIndex].amount--
        return state
      } else {
        return {
          items: state.items.filter((item) => {
            return item.articleId !== payload.articleId
          })
        }
      }

    case DELETE_ITEM:
      return {
        items: state.items.filter((item) => {
          return item.articleId !== payload.articleId
        })
      }

    default:
      return state
  }
}
