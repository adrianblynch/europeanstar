import React, { Fragment } from "react"

const Cost = ({ cost }) => {
  return <Fragment>{cost.toFixed(2)}</Fragment>
}

export default Cost
