import React from "react"
import styled from "styled-components"

const StyledNoTickets = styled.div`
  font-weight: bold;
  font-size: 18px;
`
StyledNoTickets.defaultProps = { "data-component": "NoTickets" }

const NoTickets = ({ text }) => {
  return <StyledNoTickets>{text}</StyledNoTickets>
}

export default NoTickets
