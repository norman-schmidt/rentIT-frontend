/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'

import { withStyles } from '@material-ui/core/styles'
import { CircularProgress, ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import SmartphoneIcon from '@material-ui/icons/Smartphone'

const styles = theme => ({
  progress: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 200
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
          categories.map(categorie => {
            return (
          <ListItem button key={categorie.id}>
            <ListItemIcon>
              <SmartphoneIcon />
            </ListItemIcon>
            <ListItemText primary={categorie.title} />
          </ListItem>
            )
          })
        )
      : (
        <div className={classes.progress}>
        <CircularProgress />
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
