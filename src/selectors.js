import fecha from "fecha"
import { DATE_FORMAT, DISPLAY_CLASSES } from "./constants"

export const getDateForUrl = direction => state => fecha.format(new Date(state.search[`${direction}Date`]), DATE_FORMAT)

export const getOutboundDateForUrl = getDateForUrl("outbound")
export const getInboundDateForUrl = getDateForUrl("inbound")

export const getBasket = state => {
  const outbound = {}
  const inbound = {}

  if (state.outboundSelectedTrain && state.outboundSelectedTrain.id) {
    const selectedTrain = getSelectedTrain(state, "outbound")
    const outboundTrain = getTrain(state, selectedTrain.id, selectedTrain)

    outbound.origin = outboundTrain.origin
    outbound.destination = outboundTrain.destination
    outbound.adults = state.search.adults
    outbound.cls = DISPLAY_CLASSES[selectedTrain.classIndex]
    outbound.price = outboundTrain.classes && outboundTrain.classes[selectedTrain.classIndex].prices.adult * outbound.adults
  }

  if (state.inboundSelectedTrain && state.inboundSelectedTrain.id) {
    const selectedTrain = getSelectedTrain(state, "inbound")
    const inboundTrain = getTrain(state, selectedTrain.id, selectedTrain)

    inbound.origin = inboundTrain.origin
    inbound.destination = inboundTrain.destination
    inbound.adults = state.search.adults
    inbound.cls = DISPLAY_CLASSES[selectedTrain.classIndex]
    inbound.price = inboundTrain.classes && inboundTrain.classes[selectedTrain.classIndex].prices.adult * inbound.adults
  }

  return {
    outbound,
    inbound
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
