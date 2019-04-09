import React, { Fragment } from "react"
import styled from "styled-components"
import { ifProp } from "styled-tools"
import Price from "./Price"
import NoTickets from "./NoTickets"
import TicketsRemaining from "./TicketsRemaining"

const StyledCls = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 33.3%;
  padding: 0 5px 0 5px;
  ${ifProp("selectable", "cursor: pointer")};
  ${ifProp("selectable", `
    &:hover {
      background-color: white;
    }
  `)}
  ${ifProp("selected", "background-color: white;")}
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

const Cls = props => {
  const { index, prices, remaining, isNotAvailable, selected, clsSelected } = props
  const showNotAvailable = isNotAvailable
  const showSoldOut = !isNotAvailable && remaining === 0
  const showPrice = !showSoldOut && prices && prices.adult
  const selectable = showPrice && !selected
  const onClick = (selectable && !selected) ? clsSelected(index) : () => {}
  return (
    <StyledCls onClick={onClick} selectable={selectable} selected={selected}>
      {showNotAvailable && <NoTickets text="N/A" />}
      {showSoldOut && <NoTickets text="Sold out" />}
      {showPrice && (
        <Fragment>
          <Price price={prices.adult} />
          <TicketsRemaining amount={remaining} />
        </Fragment>
      )}
    </StyledCls>
  )
}
export default Cls
