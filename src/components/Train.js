import React from "react"
import styled from "styled-components"
import Cls from "./Cls"

const StyledTrain = styled.div`
  display: flex;
  background-color: #f4f4f4;
  border-radius: 5px;
`
StyledTrain.defaultProps = { "data-component": "StyledTrain" }

const StyledTimings = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 25%;
  font-size: 18px;
  border-right: 1px solid white;
  padding: 15px 0;
  span:nth-child(2) {
    padding: 4px 0;
    font-size: 11px;
  }
`
StyledTimings.defaultProps = { "data-component": "StyledTimings" }

const StyledClasses = styled.div`
  display: flex;
  width: 75%;
`
StyledClasses.defaultProps = { "data-component": "StyledClasses" }

const Train = props => {
  const { id, departureTime, duration, arrivalTime, classes, selected, trainSelected } = props

  const clsSelected = index => () => {
    trainSelected(id, index)
  }

  return (
    <StyledTrain selected={selected}>
      <StyledTimings>
        <span>{departureTime}</span>
        <span>{duration} mins</span>
        <span>{arrivalTime}</span>
      </StyledTimings>
      <StyledClasses>
        {classes.map((cls, index) => (
          <Cls key={index} index={index} {...cls} clsSelected={clsSelected} />
        ))}
      </StyledClasses>
    </StyledTrain>
  )
}

export default Train
