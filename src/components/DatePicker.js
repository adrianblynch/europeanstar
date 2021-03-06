import React from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FORM_DATE_FORMAT } from "../constants"
import { useMedia } from "../hooks"

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
    background-color: #f8f8f8;
    border: 1px solid #888;
    border-radius: 5px;
    padding-left: 5px;
    color: #555;
  }
`

const DatePicker = props => {
  const isExtraSmall = useMedia("xs")
  const isSmall = useMedia("sm")
  const withPortal = isExtraSmall || isSmall
  return (
    <DatePickerWrapper>
      <ReactDatePicker
        withPortal={withPortal}
        {...props}
        selected={new Date(props.selected)}
        dateFormat={FORM_DATE_FORMAT}
        minDate={new Date()}
      />
    </DatePickerWrapper>
  )
}

DatePicker.defaultProps = {
  "data-component": "DatePicker"
}

export default DatePicker
