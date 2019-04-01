import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import freeze from "redux-freeze"
import {
  search,
  prices,
  loadingPrices,
  selectedPrices,
  trains,
  outboundTrains,
  inboundTrains,
  outboundSelectedTrain,
  inboundSelectedTrain
} from "./reducers"

const initialState = {
  search: {},
  prices: {},
  loadingPrices: false,
  selectedPrices: {},
  trains: {

  },
  outboundTrains: [],
  inboundTrains: [],
  outboundSelectedTrain: {
    trainId: "9080",
    classIndex: 1
  },
  inboundSelectedTrain: {}
}

const reducers = combineReducers({
  search,
  prices,
  loadingPrices,
  selectedPrices,
  trains,
  outboundTrains,
  inboundTrains,
  outboundSelectedTrain,
  inboundSelectedTrain
})
const enhancers = compose(
  applyMiddleware(freeze, thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(reducers, initialState, enhancers)

export default store
