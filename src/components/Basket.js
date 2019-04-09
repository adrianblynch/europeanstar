import React, { Fragment } from "react"
import { connect } from "react-redux"
import Section from "./Section"
import SectionTitle from "./SectionTitle"
import SectionItem from "./SectionItem"
import Button from "./Button"
import { getBasket } from "../state/selectors"

const Journey = ({ origin, destination, adults, price, cls }) => {
  return (
    <Fragment>
      <h3>
        {origin} to {destination}
      </h3>
      <p>
        {adults} {cls} adult(s) - £{price}
      </p>
    </Fragment>
  )
}

const Basket = ({ basket }) => {
  const total = (basket.outbound.price || 0) + (basket.inbound.price || 0)
  const onClick = () => {
    alert("This isn't a real booking application. Head on over to eurostar.com and purchase your tickets there.")
  }
  const showOutbound = !!basket.outbound.origin
  const showInbound = !!basket.inbound.origin
  const showTotal = !!total

  return (
    <Section>
      <SectionTitle>Basket</SectionTitle>
      {showOutbound && (
        <SectionItem>
          <Journey {...basket.outbound} />
        </SectionItem>
      )}
      {showInbound && (
        <SectionItem>
          <Journey {...basket.inbound} />
        </SectionItem>
      )}
      {showTotal && <SectionItem>Total: £{total}</SectionItem>}
      <Button onClick={onClick}>Continue</Button>
    </Section>
  )
}

/*
<Button type="submit" onClick={this.submit} disabled={loadingTrains}>
  Search
</Button>
*/

const mapStateToProps = state => {
  return {
    basket: getBasket(state)
  }
}

export default connect(mapStateToProps)(Basket)
