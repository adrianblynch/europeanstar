import React from "react"
import styled from "styled-components"

const StyledTicketsRemaining = styled.div`
  // 'visibility' over 'display' to maintain the space when rendered
  ${props => (props.hide ? "visibility: hidden;" : "")}
  font-size: 13px;
`
StyledTicketsRemaining.defaultProps = { "data-component": "Remaining" }

const TicketsRemaining = ({ amount }) => {
  const hideRemaining = amount > 50

  return <StyledTicketsRemaining hide={hideRemaining}>{amount} left</StyledTicketsRemaining>
}

export default TicketsRemaining
