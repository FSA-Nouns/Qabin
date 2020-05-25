import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import Routes from './routes'
import theme from './theme'

// Setting up initial render and providing Material UI webpage theme
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
