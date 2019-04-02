import React, { Component } from "react"
import { Provider } from "react-redux"
import styled, { ThemeProvider } from "styled-components"
import breakpoint from "styled-components-breakpoint"
import store from "./store"
import Search from "./Search"
import Trains from "./Trains"
import Basket from "./Basket"

const theme = {
  breakpoints: {
    sm: 0,
    md: 600,
    lg: 900
  }
}

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  ${breakpoint("md")`
    margin-top: 20px;
    margin-bottom: 20px;
  `}
`

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <AppWrapper>
            <Search />
            <Trains />
            <Basket />
          </AppWrapper>
        </Provider>
      </ThemeProvider>
    )
  }
}

export default App
