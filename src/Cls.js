import React, { Fragment } from "react"
import styled from "styled-components"

const StyledCls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.3%;
  &:nth-child(1) {
    border-top: 10px solid #ffe600;
  }
  &:nth-child(2) {
    border-top: 10px solid #109fb3;
  }
  &:nth-child(3) {
    border-top: 10px solid #5f718c;
    border-top-right-radius: 5px;
  }
`
StyledCls.defaultProps = { "data-id": "StyledCls" }

const Price = styled.div`
  padding-top: 14px;
  font-weight: bold;
  font-size: 18px;
  span {
    font-size: 13px;
  }
`
Price.defaultProps = { "data-id": "Price" }

const Remaining = styled.div`${(props) => `
  ${props.hide ? "visibility: hidden;" : ""}
  font-size: 13px;
`}`
Remaining.defaultProps = { "data-id": "Remaining" }

const NoTickets = styled.div`
  font-weight: bold;
  font-size: 18px;
`
NoTickets.defaultProps = { "data-id": "NoTickets" }

const Cls = props => {
  const { index, prices, remaining, isNotAvailable, selected, clsSelected } = props
  const showSoldOut = !isNotAvailable && remaining === 0
  const showPrice = !showSoldOut && prices && prices.adult
  const onClick = clsSelected(index)
  const hideRemaining = remaining > 50
  return (
    <StyledCls onClick={onClick}>
      {isNotAvailable && <NoTickets>N/A</NoTickets>}
      {showSoldOut && <NoTickets>Sold<br />out</NoTickets>}
      {showPrice && (
        <Fragment>
          <Price>
            <span>£</span>
            {prices.adult}
          </Price>
          <Remaining hide={hideRemaining}>{remaining} left</Remaining>
        </Fragment>
      )}
    </StyledCls>
  )
}
export default Cls
