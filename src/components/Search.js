import React from "react"
import { connect } from "react-redux"
import { LONDON, PARIS, EBSFLEET, AMSTERDAM } from "../constants"
import { searchUpdate, loadTrains } from "../state/actions"
import SectionTitle from "./SectionTitle"
import Section from "./Section"
import SectionItem from "./SectionItem"
import Fieldset from "./Fieldset"
import Fieldsets from "./Fieldsets"
import Button from "./Button"
import DatePicker from "./DatePicker"

const now = new Date()
const tomorrow = now.setDate(now.getDate() + 2)

class Search extends React.Component {
  state = {
    outboundStation: LONDON,
    outboundDate: tomorrow,
    inboundStation: PARIS,
    inboundDate: tomorrow,
    adults: 2,
    youths: 1,
    children: 1
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
                <label>
                  From:
                  <br />
                  <select value={outboundStation} onChange={this.onChange} name="outboundStation">
                    <option value={LONDON}>London</option>
                    <option value={EBSFLEET}>Ebsfleet</option>
                  </select>
                </label>
              </Fieldset>
              <Fieldset>
                <label>
                  To:
                  <br />
                  <select value={inboundStation} onChange={this.onChange} name="inboundStation">
                    <option value={PARIS}>Paris</option>
                    <option value={AMSTERDAM}>Amsterdam</option>
                  </select>
                </label>
              </Fieldset>
            </Fieldsets>
          </SectionItem>

          <SectionItem>
            <Fieldsets>
              <Fieldset>
                <label>
                  Leaving:
                  <br />
                  <DatePicker selected={outboundDate} onChange={this.outboundDateSelected} />
                </label>
              </Fieldset>
              <Fieldset>
                <label>
                  Returning:
                  <br />
                  <DatePicker selected={inboundDate} onChange={this.inboundDateSelected} />
                </label>
              </Fieldset>
            </Fieldsets>
          </SectionItem>

          <SectionItem>
            <Fieldsets>
              <Fieldset>
                <label>
                  Adults:
                  <br />
                  <input type="text" value={adults} onChange={this.onChange} name="adults" />
                </label>
              </Fieldset>
              <Fieldset>
                <label>
                  Youths:
                  <br />
                  <input type="text" value={youths} onChange={this.onChange} name="youths" />
                </label>
              </Fieldset>
              <Fieldset>
                <label>
                  Children:
                  <br />
                  <input type="text" value={children} onChange={this.onChange} name="children" />
                </label>
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
