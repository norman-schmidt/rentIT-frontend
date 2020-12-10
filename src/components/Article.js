/* eslint-disable react/prop-types */
import React from 'react'
// import axios from 'axios'

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

const initState = {
  article: {
    id: 1,
    name: 'SAMSUNG Galaxy Fold 2 256 GB Mystic Black',
    serialNumber: 1234,
    model: 'Galaxy Fold 2',
    stockLevel: 3,
    price: 1948.61,
    properties: {
      battery: '9h',
      displays: '2'
    },
    category: 'Smartphones',
    images: [
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_76979761/fee_786_587_png',
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_76979837/fee_786_587_png',
      'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_76979852/fee_786_587_png'
    ]
  }
}

class Article extends React.Component {
    state = initState

    componentDidMount () {
    // fetch stuff
    //
    //   axios.get('https://jsonplaceholder.typicode.com/posts')
    //     .then(res => {
    //       console.log(res)
    //       this.setState({
    //         categories: res.data.slice(20)
    //       })
    //     })
    }

    render () {
      const { classes } = this.props
      const article = this.state.article
      const articleComponent = article
        ? (
            <Grid container>
                <Grid item xs={12} md={6} align="center">
                    <img src={article.images[0]} className={classes.image}></img>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h5">{article.name}</Typography>
                    <div className={classes.metaInfo}>
                        <Typography>Serial-No: {article.serialNumber}</Typography>
                        <Typography>Model: {article.model}</Typography>
                    </div>
                    <div>
                        <Typography className={classes.price}variant="h4">{article.price} €</Typography>
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
                <Grid item xs={12} className={classes.information}>
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
