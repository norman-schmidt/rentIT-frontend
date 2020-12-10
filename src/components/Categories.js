/* eslint-disable react/prop-types */
import React from 'react'
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

class Categories extends React.Component {
  state = {
    open: false, // when collapsable
    categories: []
  }

  componentDidMount () {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        console.log(res)
        this.setState({
          categories: res.data.slice(20)
        })
      })
  }

  handleClick = () => {
    this.setState({ open: !open })
  }

  render () {
    const { classes } = this.props
    const { categories } = this.state
    const categorieList = categories.length
      ? (
          <List>
              {categories.map(categorie => {
                return (
              <ListItem button key={categorie.id}>
                <ListItemIcon>
                  <SmartphoneIcon />
                </ListItemIcon>
                <ListItemText primary={categorie.title} />
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
    return (
      <div>
        {categorieList}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(Categories)
