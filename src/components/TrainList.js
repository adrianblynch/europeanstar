import React, { Fragment } from "react"
import Train from "./Train"
import Section from "./Section"
import SectionItem from "./SectionItem"
import SectionTitle from "./SectionTitle"
import Loading from "./Loading"
import Classes from "./Classes"

const TrainList = ({ loadingTrains, label, trains, trainSelected }) => {
  const list = trains.map(train => {
    return (
      <SectionItem key={train.id}>
        <Train trainSelected={trainSelected} {...train} />
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
        <Fragment>
          <SectionItem>
            <Classes />
          </SectionItem>
          {list}
        </Fragment>
      )}
    </Section>
  )
}

export default TrainList
