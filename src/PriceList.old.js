import React, { Fragment } from "react"
import Price from "./Price"

const PriceList = ({ label, prices, priceSelected }) => {
  return (
    <Fragment>
      <h3>{label}</h3>
      {prices.map(price => (
        <Price key={price.id} {...price} priceSelected={priceSelected} />
      ))}
    </Fragment>
  )
}

export default PriceList
