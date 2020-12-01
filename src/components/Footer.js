import React from 'react'

import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import ListIcon from '@material-ui/icons/List'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import DashboardIcon from '@material-ui/icons/Dashboard'

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: 0,
    right: 'auto',
    maxWidth: 'inherit',
    boxShadow: '0px 0px 10px -2px rgba(0,0,0,0.2)'
  },
  toolbar: {
    width: 'inherit'
  },
  bottomNavigation: {
    flexGrow: 0.9,
    maxWidth: 'inherit'
  }
}))

function Footer () {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  return (
        <AppBar elevation={4} position="fixed" color="transparent" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            showLabels
            className={classes.bottomNavigation}
        >
            <BottomNavigationAction label="Home" icon={<HomeIcon />} />
            <BottomNavigationAction label="Categories" icon={<ListIcon />} />
            <BottomNavigationAction label="Cart" icon={<ShoppingCartIcon />} />
            <BottomNavigationAction label="Dashboard/Settings" icon={<DashboardIcon />} />
        </BottomNavigation>
        </Toolbar>
      </AppBar>
  )
}

export default Footer
