import React, { Fragment } from "react"
import { connect } from "react-redux"
import { showTrains, showTrainList, showClassHeaders, showViewAllTrains, getTrains, getLoadTrainsErrors } from "../state/selectors"
import { trainSelected, trainDeselected } from "../state/actions"
import TrainList from "./TrainList"

const Trains = props => {
  const {
    showTrains,
    showOutboundTrainList,
    showInboundTrainList,
    showOutboundClassHeaders,
    showInboundClassHeaders,
    showOutboundViewAllTrains,
    showInboundViewAllTrains,
    loadingTrains,
    outboundTrains,
    inboundTrains,
    trainSelected,
    trainDeselected,
    loadTrainsErrors
  } = props
  const { outbound: outboundTrainsError, inbound: inboundTrainsError } = loadTrainsErrors

  if (!showTrains) {
    return null
  }

  const outboundTrainSelected = (id, classIndex) => trainSelected({ direction: "outbound", id, classIndex })
  const inboundTrainSelected = (id, classIndex) => trainSelected({ direction: "inbound", id, classIndex })
  const outboundTrainDeselected = () => trainDeselected({ direction: "outbound" })
  const inboundTrainDeselected = () => trainDeselected({ direction: "inbound" })

  return (
    <Fragment>
      {showOutboundTrainList && (
        <TrainList
          loadingTrains={loadingTrains}
          label="Outbound"
          trains={outboundTrains}
          trainSelected={outboundTrainSelected}
          trainDeselected={outboundTrainDeselected}
          loadError={outboundTrainsError}
          showClassHeaders={showOutboundClassHeaders}
          showViewAllTrains={showOutboundViewAllTrains}
        />
      )}
      {showInboundTrainList && (
        <TrainList
          loadingTrains={loadingTrains}
          label="Inbound"
          trains={inboundTrains}
          trainSelected={inboundTrainSelected}
          trainDeselected={inboundTrainDeselected}
          loadError={inboundTrainsError}
          showClassHeaders={showInboundClassHeaders}
          showViewAllTrains={showInboundViewAllTrains}
        />
      )}
    </Fragment>
  )
}

const mapStateToProps = state => {
  return {
    showTrains: showTrains(state),
    showOutboundTrainList: showTrainList(state, "outbound"),
    showInboundTrainList: showTrainList(state, "inbound"),
    showOutboundClassHeaders: showClassHeaders(state, "outbound"),
    showInboundClassHeaders: showClassHeaders(state, "inbound"),
    showOutboundViewAllTrains: showViewAllTrains(state, "outbound"),
    showInboundViewAllTrains: showViewAllTrains(state, "inbound"),
    loadingTrains: state.loadingTrains,
    outboundTrains: getTrains(state, "outbound"),
    inboundTrains: getTrains(state, "inbound"),
    loadTrainsErrors: getLoadTrainsErrors(state)
  }
}

const mapDispatchToProps = {
  trainSelected,
  trainDeselected
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trains)
