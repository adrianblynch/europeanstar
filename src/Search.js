import React from "react"
import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { connect } from "react-redux"
import { DISPLAY_DATE_FORMAT, LONDON, PARIS, EBSFLEET, AMSTERDAM } from "./constants"
import { searchUpdate, loadPrices } from "./actions"

const DatePicker = ({ ...props }) => {
  return <ReactDatePicker {...props} selected={new Date(props.selected)} dateFormat={DISPLAY_DATE_FORMAT} minDate={new Date()} />
}

const now = new Date().toString()

class Search extends React.Component {
  state = {
    outboundStation: LONDON,
    outboundDate: now,
    inboundStation: PARIS,
    inboundDate: now,
    adults: 2
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
    const { outboundStation, outboundDate, inboundDate, inboundStation, adults } = this.state

    return (
      <form>
        <fieldset>
          <select value={outboundStation} onChange={this.onChange} name="outboundStation">
            <option value={LONDON}>London</option>
            <option value={EBSFLEET}>Ebsfleet</option>
          </select>
          <DatePicker selected={outboundDate} onChange={this.outboundDateSelected} />
        </fieldset>

        <fieldset>
          <select value={inboundStation} onChange={this.onChange} name="inboundStation">
            <option value={PARIS}>Paris</option>
            <option value={AMSTERDAM}>Amsterdam</option>
          </select>
          <DatePicker selected={inboundDate} onChange={this.inboundDateSelected} />
        </fieldset>

        <fieldset>
          Adults: <input type="text" value={adults} onChange={this.onChange} name="adults" />
          <br />
        </fieldset>

        <fieldset>
          <button type="submit" onClick={this.submit}>
            Search
          </button>
        </fieldset>
      </form>
    )
  }
}

const mapDispatchToProps = { searchUpdate, loadPrices }

export default connect(
  null,
  mapDispatchToProps
)(Search)
