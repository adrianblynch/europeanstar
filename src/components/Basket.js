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

const SectionFooter = props => {
  return <Fragment>{props.children}</Fragment>
}

const Basket = ({ basket }) => {
  const total = (basket.outbound.price || 0) + (basket.inbound.price || 0)

  return (
    <Section>
      <SectionTitle>Basket</SectionTitle>
      <SectionItem>{basket.outbound.origin && <Journey {...basket.outbound} />}</SectionItem>
      <SectionItem>{basket.inbound.origin && <Journey {...basket.inbound} />}</SectionItem>
      <SectionItem>Total: £{total}</SectionItem>
      <Button>Continue</Button>
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
