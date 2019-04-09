import React from "react"
import { Provider } from "react-redux"
import styled, { ThemeProvider } from "styled-components"
import breakpoint from "styled-components-breakpoint"
import store from "../state/store"
import { THEME } from "../constants"
import Search from "./Search"
import Trains from "./Trains"
import Basket from "./Basket"

const AppWrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  ${breakpoint("md")`
    margin-top: 20px;
    margin-bottom: 20px;
  `}
`

const App = () => {
  return (
    <ThemeProvider theme={THEME}>
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

export default App
