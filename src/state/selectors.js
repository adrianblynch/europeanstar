import fecha from "fecha"
import { DATE_FORMAT, DISPLAY_CLASSES } from "../constants"

export const getDateForUrl = direction => state => fecha.format(new Date(state.search[`${direction}Date`]), DATE_FORMAT)

export const getOutboundDateForUrl = getDateForUrl("outbound")
export const getInboundDateForUrl = getDateForUrl("inbound")

const getBasketItem = (state, direction) => {
  const item = { passengers: [] }
  const { search } = state
  const selectedTrain = getSelectedTrain(state, direction)
  const isTrainSelected = !!(selectedTrain && selectedTrain.id)

  if (isTrainSelected) {
    const train = getTrain(state, selectedTrain.id, selectedTrain)

    item.origin = train.origin
    item.destination = train.destination
    item.cls = DISPLAY_CLASSES[selectedTrain.classIndex]

    const prices = train.classes[selectedTrain.classIndex].prices
    const defaultPrice = prices.adult || prices.youth // Prefer adult over youth and there's never a standalone child price

    if (search.adults) {
      item.passengers.push({
        type: "adult",
        amount: search.adults,
        cost: (prices.adult || defaultPrice) * search.adults
      })
    }

    if (search.youths) {
      item.passengers.push({
        type: "youth",
        amount: search.youths,
        cost: (prices.youth || defaultPrice) * search.youths
      })
    }

    if (search.children) {
      item.passengers.push({
        type: "child",
        amount: search.children,
        cost: (prices.child || defaultPrice) * search.children
      })
    }
  }

  return item
}

export const getBasket = state => {
  const outbound = getBasketItem(state, "outbound")
  const inbound = getBasketItem(state, "inbound")

  const cost =
    outbound.passengers.reduce((total, passenger) => (total = total + passenger.cost), 0) +
    inbound.passengers.reduce((total, passenger) => (total = total + passenger.cost), 0)

  return {
    outbound,
    inbound,
    cost
  }
}

const getTrain = (state, id, selectedTrain) => {
  const train = state.trains[id]

  if (!train) {
    return {}
  }

  const classes = train.classes.map((cls, index) => {
    const selected = selectedTrain.id === id && selectedTrain.classIndex === index

    return {
      ...cls,
      selected
    }
  })

  return {
    ...train,
    selected: selectedTrain.id === id,
    classes
  }
}

const getSelectedTrain = (state, direction) => {
  return state[`${direction}SelectedTrain`]
}

export const getTrains = (state, direction) => {
  const trainIds = state[`${direction}Trains`]
  const selectedTrain = getSelectedTrain(state, direction)

  return trainIds.map(id => getTrain(state, id, selectedTrain))
}

export const isReturn = state => {
  return !!state.search.inboundDate
}

export const getSearch = state => {
  return state.search
}
