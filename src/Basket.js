import React, { Fragment } from "react"
import { connect } from "react-redux"
import { getBasket } from "./selectors"

const Journey = ({ origin, destination, adults, price, cls }) => {
  return (
    <Fragment>
      <h3>
        {origin} to {destination}
      </h3>
      <p>
        {adults} {cls} adult(s) - £{price}
      </p>
    </Fragment>
  )
}

const Basket = ({ basket }) => {
  const total = (basket.outbound.price || 0) + (basket.inbound.price || 0)

  return (
    <div>
      <h2>Basket</h2>
      {basket.outbound.origin && <Journey {...basket.outbound} />}
      {basket.inbound.origin && <Journey {...basket.inbound} />}
      <p>Total: {total}</p>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    basket: getBasket(state)
  }
}

export default connect(mapStateToProps)(Basket)
