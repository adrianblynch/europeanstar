import React from "react"
import styled from "styled-components"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { DISPLAY_DATE_FORMAT } from "./constants"

// Not ideal but styling the datepicker is a little tricky
const DatePickerWrapper = styled.div`
  & .react-datepicker-wrapper {
    width: 100%;
  }
  & .react-datepicker__input-container {
    width: inherit;
  }
  & input {
    width: inherit;
    font-size: 14px;
    background-color: #f8f8f8;
    border: 1px solid #888;
    border-radius: 5px;
  }
`

const DatePicker = ({ ...props }) => (
  <DatePickerWrapper>
    <ReactDatePicker {...props} selected={new Date(props.selected)} dateFormat={DISPLAY_DATE_FORMAT} minDate={new Date()} />
  </DatePickerWrapper>
)

DatePicker.defaultProps = {
  "data-id": "DatePicker"
}

export default DatePicker
