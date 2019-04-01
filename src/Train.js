import React from "react"
import Cls from "./Cls"

const Train = ({ id, departureTime, duration, arrivalTime, classes, selected, trainSelected }) => {

  const clsSelected = index => () => {
    trainSelected(id, index)
  }

  return (
    <div>
      {id}<br />
      {selected ? "SELECTED" : null} {departureTime} --- {duration} --> {arrivalTime}
      {classes.map((cls, index) => (
        <Cls key={index} index={index} {...cls} clsSelected={clsSelected} />
      ))}
      <hr />
    </div>
  )
}

export default Train
