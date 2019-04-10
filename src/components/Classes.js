import React from "react"
import styled from "styled-components"
import { DISPLAY_CLASSES } from "../constants"

const StyledClasses = styled.div`
  --borderRadius: 5px;
  display: flex;
  justify-content: flex-end;
  div {
    width: 25%;
    height: 50px;
    font-size: 12px;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    &:nth-child(1) {
      background-color: #ffe600;
      color: #55565a;
      border-top-left-radius: var(--borderRadius);
      border-bottom-left-radius: var(--borderRadius);
    }
    &:nth-child(2) {
      background-color: #109fb3;
      color: #fff;
    }
    &:nth-child(3) {
      background-color: #5f718c;
      color: #fff;
      border-top-right-radius: var(--borderRadius);
      border-bottom-right-radius: var(--borderRadius);
    }
  }
`

const Classes = props => {
  const classes = DISPLAY_CLASSES.map((cls, index) => {
    return <div key={index}>{cls}</div>
  })

  return <StyledClasses>{classes}</StyledClasses>
}

export default Classes
