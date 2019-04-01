import fecha from "fecha"
import { DATE_FORMAT } from "./constants"

export const getDateForUrl = direction => state => fecha.format(new Date(state.search[`${direction}Date`]), DATE_FORMAT)

export const getOutboundDateForUrl = getDateForUrl("outbound")
export const getInboundDateForUrl = getDateForUrl("inbound")

export const hasPrices = direction => state => !!state.prices[direction]

export const hasOutboundPrices = hasPrices("outbound")
export const hasInboundPrices = hasPrices("inbound")

const getSelectedPrices = direction => state => state.selectedPrices[direction]

const getPriceClasses = (price, selected, classIndex) => {
  return [
    ...price.classes.map((cls, index) => {
      return {
        ...cls,
        selected: selected && classIndex === index
      }
    })
  ]
}

const getPrices = direction => state => {
  const selectedPrices = getSelectedPrices(direction)(state)

  return (state.prices[direction] || []).map(price => {

    const selected = selectedPrices && selectedPrices.trainId === price.id

    return {
      ...price,
      classes: getPriceClasses(price, selected, selectedPrices && selectedPrices.classIndex),
      selected
    }
  })
}

export const getOutboundPrices = getPrices("outbound")
export const getInboundPrices = getPrices("inbound")

export const getBasket = (state) => {
  return {
    outbound: {
      origin: "London",
      destination: "Paris",
      adults: 2,
      cls: "Standard",
      price: "400"
    },
    inbound: {
      origin: "Paris",
      destination: "London",
      adults: 2,
      cls: "Standard Premier",
      price: "800"
    }
  }
}

const getSelectedTrain = (state, direction) => {
  return state[`${direction}SelectedTrain`]
}

export const getTrains = (state, direction) => {

  const selectedTrain = getSelectedTrain(state, direction)

  return state[`${direction}Trains`].map(id => {
    return {
      selected: selectedTrain.trainId === id,
      ...state.trains[id]
    }
  })
}
