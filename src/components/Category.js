/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ArticleListItem from './ArticleListItem'

const styles = theme => ({
  skeleton: {
    margin: theme.spacing(2),
    height: 50
  }
})

class Category extends React.Component {
  categoryId = this.props.match.params.category_id

  state = {
    category: {}
  }

  componentDidMount () {
    axios.get('https://rentit-thb.herokuapp.com/api/categories/' + this.categoryId)
      .then(res => {
        this.setState({
          category: res.data
        })
      })
  }

  render () {
    const { classes } = this.props
    const { category } = this.state
    console.log(category)
    const articleList = category.articles !== undefined
      ? (
        <Box align="center" mt={3}>
            {category.articles.map((article, index) => {
              return <ArticleListItem key={index} article={article}></ArticleListItem>
            })}
        </Box>
        )
      : (
        <div>
          {Array(30).fill(0).map((a, i) => {
            return (
              <Skeleton key={i} className={classes.skeleton} variant="rect"/>
            )
          })}
        </div>
        )
    return (
      <div>
        {articleList}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Category)
