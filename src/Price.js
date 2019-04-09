import React from "react"
import styled from "styled-components"

const StyledPrice = styled.div`
  padding-top: 14px;
  font-weight: bold;
  font-size: 18px;
  span {
    font-size: 13px;
  }
`
StyledPrice.defaultProps = { "data-id": "Price" }

const Price = ({ price }) => {
  return (
    <StyledPrice>
      <span>£</span>
      {price}
    </StyledPrice>
  )
}

export default Price
