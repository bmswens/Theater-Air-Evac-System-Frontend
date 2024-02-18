// React
import React from 'react'

// router
import { BrowserRouter, HashRouter } from "react-router-dom"

// MUI
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// custom
import Nav from './nav/Nav'
import Content from './content/Content'

function Router(props) {
  const deployment = process.env.REACT_APP_DEPLOYMENT
  /* istanbul ignore if: deployment config */
  if (deployment === "github") {
    return (
      <HashRouter>
        {props.children}
      </HashRouter>
    )
  }
  return (
    <BrowserRouter>
      {props.children}
    </BrowserRouter>
  )
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Nav />
          <Content />
        </ThemeProvider>
      </LocalizationProvider>
    </Router>
  );
}

export default App