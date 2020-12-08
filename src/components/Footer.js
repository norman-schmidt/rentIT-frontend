import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import SearchIcon from '@material-ui/icons/Search'
import DashboardIcon from '@material-ui/icons/Dashboard'

import { useHistory, useLocation } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: -1,
    right: 'auto',
    maxWidth: theme.breakpoints.values.md,
    boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.2)'
  },
  bottomNavigation: {
    flexGrow: 1,
    width: '100%',
    height: '100%'
  }
}))

function Footer () {
  const classes = useStyles()
  const history = useHistory()
  const path = useLocation().pathname

  // set the right bottomNavigation to active
  const [value, setValue] = useState(getPathValue())

  function getPathValue () {
    if (path.length === 1) return 'home'
    else {
      let end = path.indexOf('/', 1)
      if (end === -1) {
        end = path.length
      }
      return path.substring(1, end)
    }
  }

  useEffect(() => {
    setValue(getPathValue())
  })

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleClick = (to) => {
    history.push(to)
  }

  return (
    <AppBar elevation={4} position="fixed" color="transparent" className={classes.appBar} noGutters>
      <Toolbar disableGutters>
        <BottomNavigation
            value={value}
            onChange={handleChange}
            // showLabels
            className={classes.bottomNavigation}
        >
            <BottomNavigationAction
              label="Home"
              value="home"
              icon={<HomeIcon />}
              onClick={() => handleClick('/')}
            />
            <BottomNavigationAction
              label="Categories"
              value="categories"
              icon={<ListIcon />}
              onClick={() => handleClick('/categories')}
            />
            <BottomNavigationAction
              label="Search"
              value="search"
              icon={<SearchIcon />}
              onClick={() => handleClick('/search')}
            />
            <BottomNavigationAction
              label="Dashboard"
              value="dashboard"
              icon={<DashboardIcon />}
              onClick={() => handleClick('/dashboard')}
            />
        </BottomNavigation>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
