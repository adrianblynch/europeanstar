import React, { Fragment } from "react"
import Train from "./Train"
import Section from "./Section"
import SectionItem from "./SectionItem"
import SectionTitle from "./SectionTitle"
import Loading from "./Loading"
import Classes from "./Classes"
import Button from "./Button"

const Trains = ({ list, showClassHeaders }) => {
  return (
    <Fragment>
      {showClassHeaders && (
        <SectionItem>
          <Classes />
        </SectionItem>
      )}
      {list}
    </Fragment>
  )
}

const TrainList = ({ showClassHeaders, showViewAllTrains, loadingTrains, label, trains, trainSelected, trainDeselected, loadError }) => {
  const list = trains.map(train => {
    return (
      <SectionItem key={train.id}>
        <Train trainSelected={trainSelected} {...train} />
      </SectionItem>
    )
  })

  const showError = !!loadError
  const showLoading = !showError && loadingTrains
  const showTrains = !showLoading && !showError

  return (
    <Section>
      <SectionTitle>{label}</SectionTitle>
      {showError && <SectionItem>️{loadError}</SectionItem>}
      {showLoading && (
        <SectionItem>
          <Loading />
        </SectionItem>
      )}
      {showTrains && <Trains list={list} showClassHeaders={showClassHeaders} />}
      {showViewAllTrains && <Button onClick={trainDeselected}>View all trains</Button>}
    </Section>
  )
}

export default TrainList
