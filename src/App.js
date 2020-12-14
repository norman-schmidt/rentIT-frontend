/* eslint-disable space-before-function-paren */
import React from 'react'

import Home from './components/Home'
import Article from './components/Article'
import Categories from './components/Categories'
import Search from './components/Search'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import searchReducer from './reducers/searchReducer'

const theme = createMuiTheme({
  spacing: 8,
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
    paddingBottom: 100
  }
})

const store = createStore(
  searchReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function App() {
  const classes = useStyles()

  return (
    <Provider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <Container disableGutters maxWidth="md" className={classes.root}>
            <Header></Header>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/article/:article_id" component={Article}></Route>
              <Route path="/categories" component={Categories}></Route>
              <Route path="/search/:searchValue" component={Search}></Route>
              <Route path="/search" component={Search}></Route>
              <Route path="/dashboard" component={Dashboard}></Route>
            </Switch>
            <Footer></Footer>
          </Container>
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default App
