import React, { Component } from "react"
import { Provider } from "react-redux"
import store from "./store"
import Search from "./Search"
import Trains from "./Trains"
import Basket from "./Basket"

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Search />
          {/*<Prices />*/}
          <Trains />
          <Basket />
        </div>
      </Provider>
    )
  }
}

export default App
