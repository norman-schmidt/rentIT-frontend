/* eslint-disable react/prop-types */
import React from 'react'

import { Box, Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const styles = theme => ({
  root: {
    margin: -1,
    padding: 10,
    display: 'flex',
    alignItems: 'center'
  },
  gridContainer: {
    padding: 30
  },
  image: {
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: 140
    },
    [theme.breakpoints.up('sm')]: {
      maxHeight: 200
    }
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20
  },
  title: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      justifyContent: 'center'
    },
    [theme.breakpoints.up('sm')]: {
      textAlign: 'left',
      justifyContent: 'flex-start'
    }
  },
  price: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 15,
    paddingRight: 15,
    paddingBottom: 10
  }
})

function ArticleListItem (props) {
  const { classes } = props
  const { article } = props
  const history = useHistory()
  console.log(article)
  return (
        <Paper variant="outlined" square className={classes.root} onClick={() => { history.push('/article/' + article.articleId) }}>
          <Grid container spacing={3} component={Button} className={classes.gridContainer}>
            <Grid item xs={12} sm={5}>
              <img className={classes.image} src={article.images[0].imageLink}></img>
            </Grid>
            <Grid item xs={12} sm={7} className={classes.info}>
              <Typography className={classes.title} align="left" variant="h6">{article.name}</Typography>
              <Box className={classes.price}>
              <Typography variant="h6">{article.price.toFixed(2).replace('.', ',')} €</Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
  )
}

export default withStyles(styles, { withTheme: true })(ArticleListItem)