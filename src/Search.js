import React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"
import { connect } from "react-redux"
import { DISPLAY_DATE_FORMAT, LONDON, PARIS, EBSFLEET, AMSTERDAM } from "./constants"
import { searchUpdate, loadPrices } from "./actions"
import SectionTitle from "./SectionTitle"
import Section from "./Section"
import SectionItem from "./SectionItem"

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
    border-radius: 5px;
  }
`

const DatePicker = ({ ...props }) => (
  <DatePickerWrapper>
    <ReactDatePicker {...props} selected={new Date(props.selected)} dateFormat={DISPLAY_DATE_FORMAT} minDate={new Date()} />
  </DatePickerWrapper>
)

const now = new Date(2019, 3, 5).toString()

const Fieldset = styled.div``

const FieldsetItem = styled.div`
  // display: flex;
  // flex-direction: column;
  // flex-grow: 1;
  // padding: 5px 10px 5px 10px;

  // ${breakpoint("md")`
  //   width: 50%;
  //   padding: initial;
  //   margin-right: 10px;
  // `}

  // &:first-child {
  //   padding-top: 10px;
  //   ${breakpoint("md")`
  //     padding-top: initial;
  //   `}
  // }

  // &:last-child {
  //   padding-bottom: 10px;
  //   ${breakpoint("md")`
  //     padding-bottom: initial;
  //     margin-right: 0px;
  //   `}
  // }

  // & > label {
  //   color: #55565a;
  //   font-size: 12px;
  // }

  // & > input[type="text"] {
  //   width: 100%;
  //   font-size: 14px;
  //   border: 1px solid #888;
  //   border-radius: 5px;
  // }

  // & > select {
  //   font-size: 14px;
  //   border: 1px solid #888;
  //   background-color: white;
  // }
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
  &:disabled {
    background-color: #e6e6e7;
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

  // TEMP
  componentDidMount() {
    this.submit({preventDefault: () => {}})
  }

  render() {
    const { outboundStation, outboundDate, inboundDate, inboundStation, adults, youths, children } = this.state
    const { loadingTrains } = this.props

    return (
      <Section>
        <form>
          <SectionTitle>Search</SectionTitle>
          <SectionItem>
            <Fieldset>
              <label>From:</label>
              <select value={outboundStation} onChange={this.onChange} name="outboundStation">
                <option value={LONDON}>London</option>
                <option value={EBSFLEET}>Ebsfleet</option>
              </select>
            </Fieldset>
            <Fieldset>
              <label>To:</label>
              <select value={inboundStation} onChange={this.onChange} name="inboundStation">
                <option value={PARIS}>Paris</option>
                <option value={AMSTERDAM}>Amsterdam</option>
              </select>
            </Fieldset>
          </SectionItem>

          <SectionItem>
            <Fieldset>
              <label>Leaving:</label>
              <DatePicker selected={outboundDate} onChange={this.outboundDateSelected} />
            </Fieldset>
            <Fieldset>
              <label>Returning:</label>
              <DatePicker selected={inboundDate} onChange={this.inboundDateSelected} />
            </Fieldset>
          </SectionItem>

          <SectionItem>
            <Fieldset>
              <label>Adults:</label> <input type="text" value={adults} onChange={this.onChange} name="adults" />
            </Fieldset>
            <Fieldset>
              <label>Youths:</label> <input type="text" value={youths} onChange={this.onChange} name="youths" />
            </Fieldset>
            <Fieldset>
              <label>Children:</label> <input type="text" value={children} onChange={this.onChange} name="children" />
            </Fieldset>
          </SectionItem>

          <Button type="submit" onClick={this.submit} disabled={loadingTrains}>
            Search
          </Button>
        </form>
      </Section>
    )
  }
}

const mapStateToProps = state => ({ loadingTrains: state.loadingTrains })
const mapDispatchToProps = { searchUpdate, loadPrices }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
