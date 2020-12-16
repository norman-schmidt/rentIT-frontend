/* eslint-disable react/prop-types */
import React from 'react'
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

class Article extends React.Component {
    state = {
      article: {}
    }

    articleId = this.props.match.params.article_id

    componentDidMount () {
      axios.get('https://rentit-thb.herokuapp.com/api/articles/' + this.articleId)
        .then(res => {
          console.log(res)
          this.setState({
            article: res.data
          })
        })
    }

    render () {
      const { classes } = this.props
      const { article } = this.state
      console.log(article)
      const articleComponent = article.articleId
        ? (
            <Grid container>
                <Grid item xs={12} md={6} align="center">
                    <img src={article.images[0].imageLink} className={classes.image}></img>
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
                  <Typography variant="p">{article.description}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.moreInformation}>
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
      return (
        <Container className={classes.article}>
            { articleComponent }
        </Container>
      )
    }
}

export default withStyles(styles, { withTheme: true })(Article)
