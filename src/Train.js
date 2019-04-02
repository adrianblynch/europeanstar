import React from "react"
import Cls from "./Cls"

const Train = props => {
  const { id, departureTime, duration, arrivalTime, classes, selected, trainSelected } = props

  const clsSelected = index => () => {
    trainSelected(id, index)
  }

  return (
    <div>
      {id} {selected ? "SELECTED" : null}
      <br />
      {departureTime} --- {duration} --> {arrivalTime}
      {classes.map((cls, index) => (
        <Cls key={index} index={index} {...cls} clsSelected={clsSelected} />
      ))}
      <hr />
    </div>
  )
}

export default Train
