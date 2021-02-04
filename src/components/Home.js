/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import Axios from 'axios'

const useStyles = makeStyles({
  root: {
    paddingTop: 16
  },
  card: {
    width: '80%',
    marginTop: 30
  },
  media: {
    height: 200
  }
})

function Home (props) {
  const classes = useStyles()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    Axios.get('https://rentit-thb.herokuapp.com/api/categories/name/')
      .then(res => {
        console.log(res.data)
        setCategories(res.data)
      })
  }, [])

  return (
    <div className={classes.root} align="center">
      <Typography variant="h4" align="center" paragraph>Willkommen bei RentIT</Typography>
      <Typography variant="subtitle1" align="center" paragraph>Ihr Ort um IT-Geräte bequem auszuleihen.</Typography>

      {categories.map((categorie, i) => {
        return (
          <Card key={i} className={classes.card}>
            <CardActionArea onClick={() => props.history.push('/categories/' + categorie)}>
              <CardMedia
                className={classes.media}
                image="https://mediacloud.kiplinger.com/image/private/s--r6zIX9Es--/v1602874257/Investing/small-cap-tech-stocks.jpg"
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="h6">
                  {categorie.toUpperCase()}
              </Typography>
                <Typography variant="body2" color="textSecondary" component="p">

              </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })}
    </div>
  )
}

export default Home
