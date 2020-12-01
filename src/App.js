import React from 'react'

import Header from './components/Header'
import Footer from './components/Footer'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

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

function App () {
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters maxWidth="md" className={classes.root}>
        <Header></Header>
        <Footer></Footer>
      </Container>
    </ThemeProvider>
  )
}

export default App
