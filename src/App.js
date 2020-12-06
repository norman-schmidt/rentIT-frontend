/* eslint-disable space-before-function-paren */
import React from 'react'

import Home from './components/Home'
import Categories from './components/Categories'
import ShoppingCart from './components/ShoppingCart'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { BrowserRouter as Router, Route } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#673ab7'
    },
    secondary: {
      main: '#f50057'
    },
    tonalOffset: 0.2
  }
})

const useStyles = makeStyles({
  root: {
  }
})

function App() {
  const classes = useStyles()

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Container disableGutters maxWidth="md" className={classes.root}>
          <Header></Header>
          <Route exact path="/" component={Home}></Route>
          <Route path="/categories" component={Categories}></Route>
          <Route path="/cart" component={ShoppingCart}></Route>
          <Route path="/dashboard" component={Dashboard}></Route>
          <Footer></Footer>
        </Container>
      </ThemeProvider>
    </Router>
  )
}

export default App
