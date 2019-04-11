import React from "react"
import { connect } from "react-redux"
import Section from "./Section"
import SectionTitle from "./SectionTitle"
import SectionItem from "./SectionItem"
import Button from "./Button"
import BasketItem from "./BasketItem"
import { getBasket } from "../state/selectors"

const Basket = ({ basket }) => {
  const showOutbound = !!basket.outbound.origin
  const showInbound = !!basket.inbound.origin
  const showTotal = true
  const disableButton = !(showOutbound && showInbound)

  const onClick = () => {
    alert("This isn't a real booking application. Head on over to eurostar.com and purchase your tickets there.")
  }

  return (
    <Section>
      <SectionTitle>Basket</SectionTitle>
      {showOutbound && (
        <SectionItem>
          <BasketItem {...basket.outbound} />
        </SectionItem>
      )}
      {showInbound && (
        <SectionItem>
          <BasketItem {...basket.inbound} />
        </SectionItem>
      )}
      {showTotal && <SectionItem>Total: £{basket.cost}</SectionItem>}
      <Button onClick={onClick} disabled={disableButton}>
        Continue
      </Button>
    </Section>
  )
}

const mapStateToProps = state => {
  return {
    basket: getBasket(state)
  }
}

export default connect(mapStateToProps)(Basket)
