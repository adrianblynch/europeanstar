import get from "lodash.get"
import { SEARCH_UPDATED, LOADING_TRAINS, TRAINS_LOADED, TRAIN_SELECTED, TRAIN_DESELECTED, LOAD_TRAINS_ERRORS } from "./actions"
import { STATIONS } from "../constants"

export const search = (state = {}, { type, data }) => {
  if (type === SEARCH_UPDATED) {
    // Ensure passenger types are numeric
    data.adults = parseInt(data.adults || 0, 10)
    data.youths = parseInt(data.youths || 0, 10)
    data.children = parseInt(data.children || 0, 10)

    return Object.assign({}, state, data)
  }

  return state
}

export const loadingTrains = (state = false, { type, data }) => (type === LOADING_TRAINS ? data : state)

export const trains = (state = {}, { type, data }) => {
  if (type === TRAINS_LOADED) {
    const outboundJourneys = get(data, "outbound.journey", [])
    const inboundJourneys = get(data, "inbound.journey", [])

    return [...outboundJourneys, ...inboundJourneys].reduce((trains, train) => {
      const { id, departureTime, arrivalTime, duration, direct, class: cls, segment: segments } = train

      const classes = cls.map(({ isCheapest, remaining, price: prices, isNotAvailable }) => {
        return {
          isNotAvailable,
          isCheapest,
          remaining,
          prices
        }
      })

      const origin = STATIONS[segments[0].originCode]
      const destination = STATIONS[segments[segments.length - 1].destinationCode]

      trains[train.id] = {
        id,
        departureTime,
        arrivalTime,
        duration,
        direct,
        classes,
        origin,
        destination
      }

      return trains
    }, {})
  }

  return state
}

const directionalTrains = direction => (state = [], { type, data }) => {
  if (type === TRAINS_LOADED) {
    return get(data, `${direction}.journey`, []).map(train => train.id)
  }
  return state
}

export const outboundTrains = directionalTrains("outbound")
export const inboundTrains = directionalTrains("inbound")

const selectedTrain = direction => (state = {}, { type, data }) => {
  if (type === TRAIN_SELECTED && data.direction === direction) {
    const { id, classIndex } = data
    return { id, classIndex }
  } else if (type === TRAIN_DESELECTED && data.direction === direction) {
    return { id: null, classIndex: null }
  }
  return state
}

export const outboundSelectedTrain = selectedTrain("outbound")
export const inboundSelectedTrain = selectedTrain("inbound")

export const loadTrainsErrors = (state = {}, { type, data }) => {
  if (type === LOAD_TRAINS_ERRORS) {
    const { direction, msg } = data

    return {
      ...state,
      ...{ [direction]: msg }
    }
  } else if (type === SEARCH_UPDATED) {
    return { outbound: "", inbound: "" }
  }
  return state
}
