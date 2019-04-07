import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import freeze from "redux-freeze"
import { search, loadingTrains, trains, outboundTrains, inboundTrains, outboundSelectedTrain, inboundSelectedTrain } from "./reducers"

const initialState = {
  search: {},
  loadingTrains: false,
  trains: {},
  outboundTrains: [],
  inboundTrains: [],
  outboundSelectedTrain: { id: null, classIndex: null },
  inboundSelectedTrain: { id: null, classIndex: null }
}

const reducers = combineReducers({
  search,
  loadingTrains,
  trains,
  outboundTrains,
  inboundTrains,
  outboundSelectedTrain,
  inboundSelectedTrain
})

const middleware = [thunk]

if (process.env.NODE_ENV !== "production") {
  middleware.unshift(freeze)
}

const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(reducers, initialState, enhancers)

export default store
