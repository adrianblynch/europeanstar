import { SEARCH_UPDATED, LOADING_TRAINS, TRAINS_LOADED, TRAIN_SELECTED } from "./actions"
import { STATIONS } from "./constants"

export const search = (state = {}, { type, data }) => {
  if (type === SEARCH_UPDATED) {
    return Object.assign({}, state, data)
  }

  return state
}

export const loadingTrains = (state = false, { type, data }) => (type === LOADING_TRAINS ? data : state)

export const trains = (state = {}, { type, data }) => {
  if (type === TRAINS_LOADED) {
    return [...data.outbound.journey, ...data.inbound.journey].reduce((trains, train) => {
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
    return data[direction].journey.map(train => train.id)
  }
  return state
}

export const outboundTrains = directionalTrains("outbound")
export const inboundTrains = directionalTrains("inbound")

const directionalSelectedTrain = direction => (state = {}, { type, data }) => {
  if (type === TRAIN_SELECTED && data.direction === direction) {
    const { id, classIndex } = data
    return { id, classIndex }
  }
  return state
}

export const outboundSelectedTrain = directionalSelectedTrain("outbound")
export const inboundSelectedTrain = directionalSelectedTrain("inbound")
