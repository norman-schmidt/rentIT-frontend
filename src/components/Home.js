import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    paddingTop: 16
  },
  card: {
    width: '80%'
  },
  media: {
    height: 240
  }
})

function Home () {
  const classes = useStyles()
  return (
    <div className={classes.root} align="center">
      <Card className={classes.card}>
        <CardActionArea component={Link} to="/article/1">
          <CardMedia
            className={classes.media}
            image="https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_76979761/fee_786_587_png"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6">
              SAMSUNG Galaxy Fold 2 256 GB Mystic Black
          </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
              across all continents except Antarctica
          </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  )
}

export default Home
