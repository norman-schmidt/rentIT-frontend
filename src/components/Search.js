/* eslint-disable react/prop-types */
import React from 'react'

import ArticleListItem from './ArticleListItem'

import { Box, Typography, withStyles } from '@material-ui/core'

import { connect } from 'react-redux'
import { search } from '../actions/searchAction'

const styles = theme => ({
})

function Search (props) {
  // const { classes } = props
  const searchValue = props.searchValue
  const searchValueUrl = props.match.params.searchValue
  if (searchValueUrl && searchValue !== searchValueUrl) props.search(searchValueUrl)
  console.log(searchValue)
  const searchList = searchValue !== ''
    ? (
      <Box align="center" mt={3}>
        <Typography align="left">Ihre suche nach {searchValue} ergab folgende Treffer:</Typography>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
        <ArticleListItem></ArticleListItem>
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

const mapStateToProps = (state) => {
  return {
    searchValue: state.searchValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (value) => { dispatch(search(value)) }
  }
}

export default withStyles(styles, { withTheme: true })(connect(mapStateToProps, mapDispatchToProps)(Search))
