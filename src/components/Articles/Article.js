/* eslint-disable react/prop-types */
import { React, useEffect, useState } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { Container, Grid, Button, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const styles = theme => ({
  article: {
    padding: '25px 50px 100px 50px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left'
    }
  },
  skeleton: {
    margin: theme.spacing(2)
  },
  image: {
    maxWidth: '100%',
    maxHeight: 400,
    [theme.breakpoints.down('md')]: {
      marginBottom: 30
    }
  },
  information: {
    paddingLeft: 30
  },
  moreInformation: {
    paddingTop: 40
  },
  metaInfo: {
    paddingTop: 15
  },
  price: {
    marginTop: 50
  },
  priceButton: {
    marginTop: 20,
    width: '80%',
    height: 50
  }
})

function Article (props) {
  const articleId = props.match.params.article_id

  const [article, setArticle] = useState({})

  useEffect(() => {
    axios.get('https://rentit-thb.herokuapp.com/api/articles/' + articleId)
      .then(res => {
        console.log(res)
        setArticle(res.data)
      })
  }, [])

  const { classes } = props
  console.log(article)
  return (
      <Container className={classes.article}>
        { article.articleId
          ? (
              <Grid container>
                  <Grid item xs={12} md={6} align="center">
                      <img src={article.images[0] ? article.images[0].imageLink : 'https://i.stack.imgur.com/GNhxO.png'} className={classes.image}></img>
                  </Grid>
                  <Grid item xs={12} md={6} className={classes.information}>
                      <Typography variant="h5">{article.name}</Typography>
                      <div className={classes.metaInfo}>
                          <Typography>Serial-No: {article.serialNumber}</Typography>
                          <Typography>Model: {article.model}</Typography>
                      </div>
                      <div>
                          <Typography className={classes.price} variant="h4">{article.price.toFixed(2).replace('.', ',')} €</Typography>
                          <Button
                              variant="contained"
                              color="primary"
                              className={classes.priceButton}
                              endIcon={<ShoppingCartIcon />}
                          >
                              Add
                          </Button>
                      </div>
                  </Grid>
                  <Grid item xs={12} className={classes.moreInformation}>
                    <Typography paragraph>{article.description}</Typography>
                    <Typography variant="h5">Properties...</Typography>
                  </Grid>
              </Grid>
            )
          : (
              <Grid container>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton} variant="rect" height={300}/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton} width="60%"/>
                  </Grid>
                  <Grid item xs={12}>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                      <Skeleton className={classes.skeleton}/>
                  </Grid>
              </Grid>
            )
        }
      </Container>
  )
}

export default withStyles(styles, { withTheme: true })(Article)
