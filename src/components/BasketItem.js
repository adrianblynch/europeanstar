import React from "react"
import styled from "styled-components"
import Cost from "./Cost"

const StyledPassenger = styled.div`
  margin-top: 8px;
  margin-bottom: 0;
`
StyledPassenger.defaultProps = { "data-id": "StyledPassenger" }

const Passengers = ({ passengers = [], cls }) => {
  return passengers.map(({ type, amount, cost }) => {
    return (
      <StyledPassenger key={type}>
        {amount} x {cls} {type} - £<Cost cost={cost} />
      </StyledPassenger>
    )
  })
}

const StyledBasketItem = styled.div`
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
`
StyledBasketItem.defaultProps = { "data-id": "StyledBasketItem" }

const BasketItem = props => {
  const { origin, destination, cls, passengers } = props

  return (
    <StyledBasketItem>
      <h3>
        {origin} to {destination}
      </h3>
      <Passengers passengers={passengers} cls={cls} />
    </StyledBasketItem>
  )
}

export default BasketItem
