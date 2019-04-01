import axios from "axios"
import { getOutboundDateForUrl, getInboundDateForUrl } from "./selectors"

export const SEARCH_UPDATED = "SEARCH_UPDATED"
export const LOADING_PRICES = "LOADING_PRICES"
export const PRICES_LOADED = "PRICES_LOADED"
export const PRICE_SELECTED = "PRICE_SELECTED"
export const TRAIN_SELECTED = "TRAIN_SELECTED"

export const searchUpdate = data => {
  return {
    type: SEARCH_UPDATED,
    data
  }
}

export const loadingPrices = data => {
  return { type: LOADING_PRICES, data }
}

export const pricesLoaded = data => {
  return { type: PRICES_LOADED, data }
}

export const loadPrices = () => async (dispatch, getState) => {
  dispatch(loadingPrices(true))

  const state = getState()
  const { outboundStation, inboundStation, adults } = state.search

  const baseUrl = "https://api.prod.eurostar.com/bpa/koa/train-search/uk-en"
  const url = `${baseUrl}/${outboundStation}/${inboundStation}`
  const headers = { "x-apikey": "0aa3d4b7e805493c8e310cfb871c4344" }

  // try {
    // const response = await axios.request({
    //   baseUrl,
    //   url,
    //   params: {
    //     "outbound-date": getOutboundDateForUrl(state),
    //     "inbound-date": getInboundDateForUrl(state),
    //     adult: adults,
    //     "booking-type": "standard"
    //   },
    //   headers
    // })

    const response = { data: require("./prices.json") }

    dispatch(pricesLoaded(response.data))
    dispatch(loadingPrices(false))
  // } catch (e) {
  //   console.log("loadPrices():e", e)
  // }
}

export const priceSelected = data => {
  return {
    type: PRICE_SELECTED,
    data
  }
}

export const trainSelected = data => {
  return {
    type: TRAIN_SELECTED,
    data
  }
}
