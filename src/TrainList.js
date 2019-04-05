import React, { Fragment } from "react"
import Train from "./Train"
import Section from "./Section"
import SectionItem from "./SectionItem"
import SectionTitle from "./SectionTitle"
import Loading from "./Loading"

const TrainList = ({ loadingTrains, label, trains, trainSelected }) => {
  const list = trains.map(train => {
    return (
      <SectionItem>
        <Train key={train.id} trainSelected={trainSelected} {...train} />
      </SectionItem>
    )
  })

  return (
    <Section>
      <SectionTitle>{label}</SectionTitle>
      {loadingTrains ? (
        <SectionItem>
          <Loading width={150} height={150} />
        </SectionItem>
      ) : (
        <Fragment>{list}</Fragment>
      )}
    </Section>
  )
}

export default TrainList
