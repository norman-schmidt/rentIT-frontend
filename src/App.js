import React from 'react'

import Header from './components/Header'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
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

// const useStyles = makeStyles({
//   root: {
//     background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
//     maxWidth: 960
//   }
// })

function App () {
  // const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Header></Header>
      </Container>
    </ThemeProvider>
  )
}

export default App
