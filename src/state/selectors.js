import fecha from "fecha"
import { DATE_FORMAT, DISPLAY_CLASSES } from "../constants"

export const getDateForUrl = direction => state => fecha.format(new Date(state.search[`${direction}Date`]), DATE_FORMAT)

export const getOutboundDateForUrl = getDateForUrl("outbound")
export const getInboundDateForUrl = getDateForUrl("inbound")

// TODO: This is in serious need of a refactor!
export const getBasket = state => {
  const outbound = {}
  const inbound = {}
  const { search } = state

  if (state.outboundSelectedTrain && state.outboundSelectedTrain.id) {
    const selectedTrain = getSelectedTrain(state, "outbound")
    const outboundTrain = getTrain(state, selectedTrain.id, selectedTrain)

    outbound.origin = outboundTrain.origin
    outbound.destination = outboundTrain.destination
    outbound.cls = DISPLAY_CLASSES[selectedTrain.classIndex]
    outbound.passengers = []

    if (outboundTrain.classes) {
      if (search.adults) {
        outbound.passengers.push({
          type: "adult",
          amount: search.adults,
          cost: outboundTrain.classes[selectedTrain.classIndex].prices.adult * search.adults
        })
      }

      if (search.youths) {
        outbound.passengers.push({
          type: "youth",
          amount: search.youths,
          cost: outboundTrain.classes[selectedTrain.classIndex].prices.youth * search.youths
        })
      }

      if (search.children) {
        outbound.passengers.push({
          type: "child",
          amount: search.children,
          cost: outboundTrain.classes[selectedTrain.classIndex].prices.child * search.children
        })
      }
    }
  }

  if (state.inboundSelectedTrain && state.inboundSelectedTrain.id) {
    const selectedTrain = getSelectedTrain(state, "inbound")
    const inboundTrain = getTrain(state, selectedTrain.id, selectedTrain)

    inbound.origin = inboundTrain.origin
    inbound.destination = inboundTrain.destination
    inbound.cls = DISPLAY_CLASSES[selectedTrain.classIndex]
    inbound.passengers = []

    if (inboundTrain.classes) {
      if (search.adults) {
        inbound.passengers.push({
          type: "adult",
          amount: search.adults,
          cost: inboundTrain.classes[selectedTrain.classIndex].prices.adult * search.adults
        })
      }

      if (search.youths) {
        inbound.passengers.push({
          type: "youth",
          amount: search.youths,
          cost: inboundTrain.classes[selectedTrain.classIndex].prices.youth * search.youths
        })
      }

      if (search.children) {
        inbound.passengers.push({
          type: "child",
          amount: search.children,
          cost: inboundTrain.classes[selectedTrain.classIndex].prices.child * search.children
        })
      }
    }
  }

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
  let trainIds = state[`${direction}Trains`]
  const selectedTrain = getSelectedTrain(state, direction)

  if (trainIds.length > 0) {
    trainIds = [trainIds[0]]
  }

  return trainIds.map(id => getTrain(state, id, selectedTrain))
}

export const isReturn = state => {
  return !!state.search.inboundDate
}
