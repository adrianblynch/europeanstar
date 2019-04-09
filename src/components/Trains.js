import React, { Fragment } from "react"
import { connect } from "react-redux"
import { getTrains, isReturn } from "../state/selectors"
import { trainSelected } from "../state/actions"
import TrainList from "./TrainList"

const Trains = props => {
  const { isReturn, loadingTrains, outboundTrains, inboundTrains, trainSelected } = props

  const outboundTrainSelected = (id, classIndex) => trainSelected({ direction: "outbound", id, classIndex })
  const inboundTrainSelected = (id, classIndex) => trainSelected({ direction: "inbound", id, classIndex })

  const showTrains = loadingTrains || !!(outboundTrains.length || inboundTrains.length)

  const outboundTrainList = showTrains && (
    <TrainList loadingTrains={loadingTrains} label="Outbound" trains={outboundTrains} trainSelected={outboundTrainSelected} />
  )
  const inboundTrainList = isReturn && showTrains && (
    <TrainList loadingTrains={loadingTrains} label="Inbound" trains={inboundTrains} trainSelected={inboundTrainSelected} />
  )

  return (
    <Fragment>
      {outboundTrainList}
      {inboundTrainList}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    isReturn: isReturn(state),
    loadingTrains: state.loadingTrains,
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
