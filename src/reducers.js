import { SEARCH_UPDATED, LOADING_PRICES, PRICES_LOADED, PRICE_SELECTED, TRAIN_SELECTED } from "./actions"

export const search = (state = {}, { type, data }) => {
  if (type === SEARCH_UPDATED) {
    return Object.assign({}, state, data)
  }

  return state
}

const transformPriceDataForState = ({ journey: journeys }) => {
  return journeys.map(data => {
    const { id, departureTime, arrivalTime, duration, direct, class: cls } = data

    const classes = cls.map(({ isCheapest, remaining, price: prices }) => {
      return {
        isCheapest,
        remaining,
        prices
      }
    })

    return {
      id,
      departureTime,
      arrivalTime,
      duration,
      direct,
      classes
    }
  })
}

export const prices = (state = {}, { type, data }) => {
  switch (type) {
    case PRICES_LOADED: {
      const newState = {}

      if (data.outbound) {
        newState.outbound = transformPriceDataForState(data.outbound)
      }

      if (data.inbound) {
        newState.inbound = transformPriceDataForState(data.inbound)
      }

      return newState
    }
    default: {
      return state
    }
  }
}

export const loadingPrices = (state = false, { type, data }) => {
  if (type === LOADING_PRICES) {
    return data
  }

  return state
}

export const selectedPrices = (state = {}, { type, data }) => {
  if (type === PRICE_SELECTED) {
    const { direction, trainId, classIndex } = data

    return Object.assign({}, state, {
      [direction]: {
        trainId,
        classIndex
      }
    })
  }

  return state
}

export const trains = (state = {}, { type, data }) => {

  if (type === PRICES_LOADED) {

    return [...data.outbound.journey, ...data.inbound.journey].reduce((trains, train) => {

      const { id, departureTime, arrivalTime, duration, direct, class: cls } = train

      const classes = cls.map(({ isCheapest, remaining, price: prices }) => {
        return {
          isCheapest,
          remaining,
          prices
        }
      })

      trains[train.id] = {
        id,
        departureTime,
        arrivalTime,
        duration,
        direct,
        classes
      }

      return trains
    }, {})
  }

  return state
}

const directionalTrains = (direction) => (state = [], { type, data }) => {
  if (type === PRICES_LOADED) {
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
