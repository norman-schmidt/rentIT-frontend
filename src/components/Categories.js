/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import SmartphoneIcon from '@material-ui/icons/Smartphone'
import Skeleton from '@material-ui/lab/Skeleton'

const styles = theme => ({
  skeleton: {
    margin: theme.spacing(2),
    height: 50
  }
})

function Categories (props) {
  // const [open, setOpen] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get('https://rentit-thb.herokuapp.com/api/categories/')
      .then(res => {
        console.log(res)
        setCategories(res.data)
      })
  }, [])

  // const handleClick = () => {
  //   setOpen(!open)
  // }

  const { classes } = props
  return (
    <div>
      {categories.length
        ? (
            <List>
                {categories.map(categorie => {
                  return (
                    <ListItem button key={categorie.categoryId} onClick={() => props.history.push('/categories/' + categorie.categoryId)}>
                      <ListItemIcon>
                        <SmartphoneIcon />
                      </ListItemIcon>
                      <ListItemText primary={categorie.name} />
                    </ListItem>
                  )
                })}
            </List>
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

export default withStyles(styles, { withTheme: true })(Categories)
