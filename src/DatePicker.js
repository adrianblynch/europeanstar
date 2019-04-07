import React from "react"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { DISPLAY_DATE_FORMAT } from "./constants"
import useMedia from "./useMedia"

// Not ideal but styling the datepicker is a little tricky so duplicate styles are here
const DatePickerWrapper = styled.div`
  & .react-datepicker-wrapper {
    width: 100%;
  }
  & .react-datepicker__input-container {
    // Doesn't inherit from .react-datepicker-wrapper as this disappears when using a portal
    width: 100%;
  }
  & input {
    width: inherit;
    font-size: 22px;
    background-color: #f8f8f8;
    border: 1px solid #888;
    border-radius: 5px;
    padding-left: 5px;
    color: #555;

    ${breakpoint("md")`
      font-size: 18px;
    `}

    ${breakpoint("lg")`
      font-size: 16px;
    `}
  }
`

const DatePicker = (props) => {
  const isSmall = useMedia("sm")
  return (
    <DatePickerWrapper>
      <ReactDatePicker withPortal={isSmall} {...props} selected={new Date(props.selected)} dateFormat={DISPLAY_DATE_FORMAT} minDate={new Date()} />
    </DatePickerWrapper>
  )
}

DatePicker.defaultProps = {
  "data-id": "DatePicker"
}

export default DatePicker
