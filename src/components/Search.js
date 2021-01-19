/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'

import ArticleListItem from './Articles/ArticleListItem'

import { Box, Typography, withStyles } from '@material-ui/core'

// import { connect } from 'react-redux'
// import { search } from '../actions/searchAction'

import axios from 'axios'

const styles = theme => ({
})

function Search (props) {
  // const { classes } = props

  const searchValue = props.match.params.search_value

  const [articles, setArticles] = useState([])
  useEffect(() => {
    axios.get('https://rentit-thb.herokuapp.com/api/articles/')
      .then(res => {
        console.log(res)
        setArticles(res.data)
      })
  }, [])
  console.log(articles)

  const searchList = (searchValue !== '' && articles.length > 0)
    ? (
    <Box align="center" mt={3}>
        <Typography align="left">Ihre suche nach {searchValue} ergab folgende Treffer:</Typography>
        {articles.map((article) => {
          console.log(article.name)
          console.log(searchValue)
          if (article.articleId && article.images[0] && article.name.toLowerCase().includes(searchValue.toLowerCase())) {
            return (
              <ArticleListItem key={article.articleId } article={article}></ArticleListItem>
            )
          }
          return null
        })}
      </Box>
      )
    : (
      <div>Type your search above</div>
      )

  return (
    <div>
      { searchList }
    </div>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     searchValue: state.searchValue
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     search: (value) => { dispatch(search(value)) }
//   }
// }

// export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Search))
export default withStyles(styles, { withTheme: true })(Search)
