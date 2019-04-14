import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import freeze from "redux-freeze"
import { createLogger } from "redux-logger"
import { search, loadingTrains, trains, outboundTrains, inboundTrains, outboundSelectedTrain, inboundSelectedTrain, loadTrainsErrors } from "./reducers"

const initialState = {
  search: {},
  loadingTrains: false,
  trains: {},
  outboundTrains: [],
  inboundTrains: [],
  outboundSelectedTrain: { id: null, classIndex: null },
  inboundSelectedTrain: { id: null, classIndex: null },
  // Let's try nesting inside an object rather than top level `outboundXxx` naming
  loadTrainsErrors: {
    outbound: "",
    inbound: ""
  }
}

const reducers = combineReducers({
  search,
  loadingTrains,
  trains,
  outboundTrains,
  inboundTrains,
  outboundSelectedTrain,
  inboundSelectedTrain,
  loadTrainsErrors
})

const middleware = [thunk]
const env = process.env.NODE_ENV

if (env !== "production") {
  middleware.unshift(freeze)
}

if (env === "development") {
  const logger = createLogger({ collapsed: true })
  middleware.push(logger)
}

const enhancers = compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
)

const store = createStore(reducers, initialState, enhancers)

export default store
