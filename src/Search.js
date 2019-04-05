import React from "react"
import { connect } from "react-redux"
import { LONDON, PARIS, EBSFLEET, AMSTERDAM } from "./constants"
import { searchUpdate, loadTrains } from "./actions"
import SectionTitle from "./SectionTitle"
import Section from "./Section"
import SectionItem from "./SectionItem"
import Fieldset from "./Fieldset"
import Fieldsets from "./Fieldsets"
import Button from "./Button"
import DatePicker from "./DatePicker"

const now = new Date(2019, 3, 5).toString()

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
    this.props.loadTrains()
  }

  // TEMP
  componentDidMount() {
    this.submit({ preventDefault: () => {} })
  }

  render() {
    const { outboundStation, outboundDate, inboundDate, inboundStation, adults, youths, children } = this.state
    const { loadingTrains } = this.props

    return (
      <Section>
        <form>
          <SectionTitle>Search</SectionTitle>
          <SectionItem>
            <Fieldsets>
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
            </Fieldsets>
          </SectionItem>

          <SectionItem>
            <Fieldsets>
              <Fieldset>
                <label>Leaving:</label>
                <DatePicker selected={outboundDate} onChange={this.outboundDateSelected} />
              </Fieldset>
              <Fieldset>
                <label>Returning:</label>
                <DatePicker selected={inboundDate} onChange={this.inboundDateSelected} />
              </Fieldset>
            </Fieldsets>
          </SectionItem>

          <SectionItem>
            <Fieldsets>
              <Fieldset>
                <label>Adults:</label>
                <input type="text" value={adults} onChange={this.onChange} name="adults" />
              </Fieldset>
              <Fieldset>
                <label>Youths:</label>
                <input type="text" value={youths} onChange={this.onChange} name="youths" />
              </Fieldset>
              <Fieldset>
                <label>Children:</label>
                <input type="text" value={children} onChange={this.onChange} name="children" />
              </Fieldset>
            </Fieldsets>
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
const mapDispatchToProps = { searchUpdate, loadTrains }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
