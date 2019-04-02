import React from "react"
import { connect } from "react-redux"
import { getTrains } from "./selectors"
import { trainSelected } from "./actions"
import TrainList from "./TrainList"

const Trains = props => {
  const { outboundTrains, inboundTrains, trainSelected } = props

  const outboundTrainSelected = (id, classIndex) => trainSelected({ direction: "outbound", id, classIndex })
  const inboundTrainSelected = (id, classIndex) => trainSelected({ direction: "inbound", id, classIndex })

  return (
    <div>
      <h2>Trains</h2>
      <TrainList label="Outbound" trains={outboundTrains} trainSelected={outboundTrainSelected} />
      <TrainList label="Inbound" trains={inboundTrains} trainSelected={inboundTrainSelected} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    outboundTrains: getTrains(state, "outbound"),
    inboundTrains: getTrains(state, "inbound")
  }
}

const mapDispatchToProps = {
  trainSelected
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trains)
