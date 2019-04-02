import React, { Fragment } from "react"
import Train from "./Train"

const TrainList = ({ label, trains, trainSelected }) => {
  const list = trains.map(train => <Train key={train.id} trainSelected={trainSelected} {...train} />)

  return (
    <Fragment>
      <h3>{label}</h3>
      {list}
    </Fragment>
  )
}

export default TrainList
