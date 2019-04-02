import React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import { connect } from "react-redux"
import { DISPLAY_DATE_FORMAT, LONDON, PARIS, EBSFLEET, AMSTERDAM } from "./constants"
import { searchUpdate, loadPrices } from "./actions"
import SectionTitle from "./SectionTitle"

// Not ideal but styling the datepicker is a little tricky
const DatePickerWrapper = styled.div`
  & .react-datepicker-wrapper {
    width: 100%;
  }
  & .react-datepicker__input-container {
    width: 100%;
  }
  & input {
    width: 100%;
    font-size: 14px;
    border: 1px solid #888;
    border-radius: 3px;
  }
`

const DatePicker = ({ ...props }) => (
  <DatePickerWrapper>
    <ReactDatePicker {...props} selected={new Date(props.selected)} dateFormat={DISPLAY_DATE_FORMAT} minDate={new Date()} />
  </DatePickerWrapper>
)

const now = new Date().toString()

const Form = styled.form`
  background-color: #06183d;
  color: white;
  padding: 16px;
  ${breakpoint('md')`
    border-radius: 4px;
  `}
`

// Issues with flexboxing fieldsets means using a div
const Fieldset = styled.div`
  --radius: 4px;
  background-color: white;
  margin-bottom: 2px;
  &:first-of-type {
    border-radius: var(--radius) var(--radius) 0 0;
  }
  &:last-of-type {
    border-radius: 0 0 var(--radius) var(--radius);
  }
  ${breakpoint("md")`
    display: flex;
    padding: 15px 20px 15px 20px;
  `}
`

const FieldsetItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 5px 10px 5px 10px;

  ${breakpoint("md")`
    width: 50%;
    padding: initial;
    margin-right: 10px;
  `}

  &:first-child {
    padding-top: 10px;
    ${breakpoint("md")`
      padding-top: initial;
    `}
  }

  &:last-child {
    padding-bottom: 10px;
    ${breakpoint("md")`
      padding-bottom: initial;
      margin-right: 0px;
    `}
  }

  & > label {
    color: #55565a;
    font-size: 12px;
  }

  & > input[type="text"] {
    width: 100%;
    font-size: 14px;
    border: 1px solid #888;
    border-radius: 3px;
  }

  & > select {
    font-size: 14px;
    border: 1px solid #888;
    background-color: white;
  }
`

const Button = styled.button`
  background-color: #fbdd0f;
  color: #55565a;
  font-size: 22px;
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: #ffea6a;
  }
`

class Search extends React.Component {
  state = {
    outboundStation: LONDON,
    outboundDate: now,
    inboundStation: PARIS,
    inboundDate: now,
    adults: 2,
    youths: 0,
    children: 0
  }

  outboundDateSelected = date => this.setState({ outboundDate: date })
  inboundDateSelected = date => this.setState({ inboundDate: date })

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  submit = e => {
    e.preventDefault()
    this.props.searchUpdate(this.state)
    this.props.loadPrices()
  }

  render() {
    const { outboundStation, outboundDate, inboundDate, inboundStation, adults, youths, children } = this.state

    return (
      <Form>
        <SectionTitle>Search</SectionTitle>
        <Fieldset>
          <FieldsetItem>
            <label>From:</label>
            <select value={outboundStation} onChange={this.onChange} name="outboundStation">
              <option value={LONDON}>London</option>
              <option value={EBSFLEET}>Ebsfleet</option>
            </select>
          </FieldsetItem>
          <FieldsetItem>
            <label>To:</label>
            <select value={inboundStation} onChange={this.onChange} name="inboundStation">
              <option value={PARIS}>Paris</option>
              <option value={AMSTERDAM}>Amsterdam</option>
            </select>
          </FieldsetItem>
        </Fieldset>

        <Fieldset>
          <FieldsetItem>
            <label>Leaving:</label>
            <DatePicker selected={outboundDate} onChange={this.outboundDateSelected} />
          </FieldsetItem>
          <FieldsetItem>
            <label>Returning:</label>
            <DatePicker selected={inboundDate} onChange={this.inboundDateSelected} />
          </FieldsetItem>
        </Fieldset>

        <Fieldset>
          <FieldsetItem>
            <label>Adults:</label> <input type="text" value={adults} onChange={this.onChange} name="adults" />
          </FieldsetItem>
          <FieldsetItem>
            <label>Youths:</label> <input type="text" value={youths} onChange={this.onChange} name="youths" />
          </FieldsetItem>
          <FieldsetItem>
            <label>Children:</label> <input type="text" value={children} onChange={this.onChange} name="children" />
          </FieldsetItem>
        </Fieldset>

        <Button type="submit" onClick={this.submit}>
          Search
        </Button>
      </Form>
    )
  }
}

const mapDispatchToProps = { searchUpdate, loadPrices }

export default connect(
  null,
  mapDispatchToProps
)(Search)
