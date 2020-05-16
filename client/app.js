import React from 'react'
import {ThemeProvider} from '@material-ui/core/styles'
import {Navbar} from './components'
import Routes from './routes'
import theme from './theme'
const App = () => {
  return (
    <ThemeProvider>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  )
}

export default App
