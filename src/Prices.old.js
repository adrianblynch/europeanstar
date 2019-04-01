import React from "react"
import { connect } from "react-redux"
import { BarLoader } from "react-css-loaders"
import PriceList from "./PriceList"
import { hasOutboundPrices, hasInboundPrices, getOutboundPrices, getInboundPrices } from "./selectors"
import { priceSelected } from "./actions"

const Prices = ({ outboundPrices, inboundPrices, loadingPrices, showOutboundPrices, showInboundPrices, priceSelected }) => {
  const showSearchMsg = !loadingPrices && !showOutboundPrices && !showInboundPrices

  const directionalPriceSelected = direction => (trainId, classIndex) => priceSelected({ direction, trainId, classIndex })

  const outboundPriceSelected = directionalPriceSelected("outbound")
  const inboundPriceSelected = directionalPriceSelected("inbound")

  return (
    <div>
      <h2>Prices</h2>
      {showSearchMsg && <p>Use the form above to search for train prices</p>}
      {loadingPrices && <BarLoader />}
      {showOutboundPrices && <PriceList label="Outbound" prices={outboundPrices} priceSelected={outboundPriceSelected} />}
      {showInboundPrices && <PriceList label="Inbound" prices={inboundPrices} priceSelected={inboundPriceSelected} />}
    </div>
  )
}

const mapStateToProps = state => {
  const { loadingPrices } = state

  return {
    outboundPrices: getOutboundPrices(state),
    inboundPrices: getInboundPrices(state),
    loadingPrices,
    showOutboundPrices: !loadingPrices && hasOutboundPrices(state),
    showInboundPrices: !loadingPrices && hasInboundPrices(state)
  }
}

const mapDispatchToProps = {
  priceSelected
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Prices)
