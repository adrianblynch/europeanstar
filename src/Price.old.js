import React from "react"
import Cls from "./Cls"

const Price = props => {
  const { id: trainId, departureTime, duration, arrivalTime, classes, selected, priceSelected } = props

  const clsSelected = index => () => {
    priceSelected(trainId, index)
  }

  return (
    <div>
      {trainId}<br />
      {selected ? "SELECTED" : null} {departureTime} --- {duration} --> {arrivalTime}
      {classes.map((cls, index) => (
        <Cls key={index} index={index} {...cls} clsSelected={clsSelected} />
      ))}
      <hr />
    </div>
  )
}

export default Price
