import axios from "axios"
import { getOutboundDateForUrl, getInboundDateForUrl } from "./selectors"

export const SEARCH_UPDATED = "SEARCH_UPDATED"
export const LOADING_TRAINS = "LOADING_TRAINS"
export const TRAINS_LOADED = "TRAINS_LOADED"
export const TRAIN_SELECTED = "TRAIN_SELECTED"

export const searchUpdate = data => {
  return {
    type: SEARCH_UPDATED,
    data
  }
}

export const loadingTrains = data => {
  return { type: LOADING_TRAINS, data }
}

export const trainsLoaded = data => {
  return { type: TRAINS_LOADED, data }
}

export const loadTrains = () => async (dispatch, getState) => {
  dispatch(loadingTrains(true))
  dispatch(trainSelected({ direction: "outbound", id: null, classIndex: null }))
  dispatch(trainSelected({ direction: "inbound", id: null, classIndex: null }))

  const state = getState()
  const { outboundStation, inboundStation, adults, youths, children } = state.search

  const baseUrl = "https://api.prod.eurostar.com/bpa/koa/train-search/uk-en"
  const url = `${baseUrl}/${outboundStation}/${inboundStation}`
  const headers = { "x-apikey": "0aa3d4b7e805493c8e310cfb871c4344" }

  try {
    const response = await axios.request({
      baseUrl,
      url,
      params: {
        "outbound-date": getOutboundDateForUrl(state),
        "inbound-date": getInboundDateForUrl(state),
        adult: adults,
        youth: youths,
        child: children,
        "booking-type": "standard"
      },
      headers
    })

    // const response = { data: require("../prices-2.json") }

    dispatch(trainsLoaded(response.data))
    dispatch(loadingTrains(false))
  } catch (e) {
    console.log("loadTrains():e", e)
  }
}

export const trainSelected = data => {
  return {
    type: TRAIN_SELECTED,
    data
  }
}
