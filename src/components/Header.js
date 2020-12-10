/* eslint-disable react/prop-types */
import React from 'react'

import { makeStyles, fade } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import InputBase from '@material-ui/core/InputBase'
import LaptopChromebook from '@material-ui/icons/LaptopChromebook'
import SearchIcon from '@material-ui/icons/Search'

import { useHistory } from 'react-router-dom'

import { connect } from 'react-redux'
import { search } from '../actions/searchAction'

const useStyles = makeStyles((theme) => ({
  header: {
    paddingBottom: 8
  },
  rentitButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    },
    fontFamily: 'Consolas'
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3)
    },
    width: 'auto'
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit',
    width: '100%'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    // }
    // transition
  }
}))

function Header (props) {
  const classes = useStyles()
  const { searchValue } = props
  const history = useHistory()

  return (
    <div className={classes.header}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.rentitButton}
            color="inherit"
            aria-label="rentit-button"
            onClick={() => {
              history.push('/')
            }}
          >
            <LaptopChromebook />
          </IconButton>
          <Typography className={classes.title} variant="h4" noWrap>
            RENTIT
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div>
                <InputBase
                placeholder="Search…"
                defaultValue={searchValue}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    props.search(e.target.value)
                    history.push('/search/' + e.target.value)
                    console.log(history)
                  }
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    searchValue: state.searchValue
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    search: (value) => { dispatch(search(value)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
