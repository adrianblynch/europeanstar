import React, { Fragment } from "react"
import { connect } from "react-redux"
import styled from "styled-components"
import { getTrains } from "./selectors"
import { trainSelected } from "./actions"
import TrainList from "./TrainList"
import Loading from "./Loading"
import Section from "./Section"
import SectionItem from "./SectionItem"
import SectionTitle from "./SectionTitle"

const Msg = styled.div`
  padding: 10px;
  text-align: center;
`

const Trains = props => {
  const { loadingTrains, outboundTrains, inboundTrains, trainSelected } = props

  const outboundTrainSelected = (id, classIndex) => trainSelected({ direction: "outbound", id, classIndex })
  const inboundTrainSelected = (id, classIndex) => trainSelected({ direction: "inbound", id, classIndex })

  const showTrains = !loadingTrains && !!(outboundTrains.length || inboundTrains.length)
  const showLoading = !showTrains && loadingTrains
  const showMsg = !showTrains && !showLoading

  return (
    <Section>
      <SectionTitle>Trains</SectionTitle>
      <SectionItem>
        {showMsg && <Msg>Use the form above to search for trains.</Msg>}
        {showLoading && <Loading width={150} height={150} />}
        {showTrains && (
          <Fragment>
            <TrainList label="Outbound" trains={outboundTrains} trainSelected={outboundTrainSelected} />
            <TrainList label="Inbound" trains={inboundTrains} trainSelected={inboundTrainSelected} />
          </Fragment>
        )}
      </SectionItem>
    </Section>
  )
}

const mapStateToProps = state => {
  return {
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
