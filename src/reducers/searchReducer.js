const initState = {
  searchValue: ''
}

// eslint-disable-next-line default-param-last
const searchReducer = (state = initState, action) => {
  if (action.type === 'SEARCH') {
    return {
      searchValue: action.value
    }
  }
  return state
}

export default searchReducer
