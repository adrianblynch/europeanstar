import React, { Fragment } from "react"
import { connect } from "react-redux"
import { getBasket } from "./selectors"

/*
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
      origin: "London",
      destination: "Paris",
      adults: 2,
      cls: "Standard Premier",
      price: "800"
    }
  }
}
*/

const Journey = ({ origin, destination, adults, price }) => {
  return (
    <Fragment>
      <h3>{origin} to {destination}</h3>
      <p>Adults x {adults} £{price}</p>
    </Fragment>
  )
}

const Basket = ({ basket }) => {
  return (
    <div>
      <h2>Basket</h2>
      <Journey {...basket.outbound} />
      <Journey {...basket.inbound} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    basket: getBasket(state)
  }
}

export default connect(mapStateToProps)(Basket)
