import React from 'react'
import { useSelector } from 'react-redux'
import AppRouter from '../routers/AppRouter'

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline"

const ExpensifyApp = () => {
  const darkModeSetting = useSelector((state) => state.appSettings.darkMode)

  const theme = createMuiTheme({
    palette: {
      type: darkModeSetting ? 'dark' : 'light'
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  )
}

export { ExpensifyApp as default }