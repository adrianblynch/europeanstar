import React from "react"
import { Provider as StateProvider } from "react-redux"
import styled, { ThemeProvider } from "styled-components"
import breakpoint from "styled-components-breakpoint"
import store from "../state/store"
import { THEME } from "../constants"
import Search from "./Search"
import Trains from "./Trains"
import Basket from "./Basket"

const StyledApp = styled.div`
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
      <StateProvider store={store}>
        <StyledApp>
          <Search />
          <Trains />
          <Basket />
        </StyledApp>
      </StateProvider>
    </ThemeProvider>
  )
}

export default App
