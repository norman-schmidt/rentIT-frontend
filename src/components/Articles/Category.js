/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
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

function Category (props) {
  const [category, setCategory] = useState([])

  const categoryName = props.match.params.category_name

  useEffect(() => {
    axios.get('https://rentit-thb.herokuapp.com/api/categories/name/' + categoryName)
      .then(res => {
        console.log(res)
        setCategory(res.data)
      })
  }, [])

  const { classes } = props
  console.log(category)
  return (
    <div>
      {category !== undefined
        ? (
          <Box align="center" mt={3}>
              {category.map((article, index) => {
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
      }
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Category)
