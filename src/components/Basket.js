import React from "react"
import { connect } from "react-redux"
import Section from "./Section"
import SectionTitle from "./SectionTitle"
import SectionItem from "./SectionItem"
import Button from "./Button"
import BasketItem from "./BasketItem"
import Cost from "./Cost"
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
      <SectionItem>{showOutbound ? <BasketItem {...basket.outbound} /> : "Select your outbound train"}</SectionItem>
      <SectionItem>{showInbound ? <BasketItem {...basket.inbound} /> : "Select your inbound train"}</SectionItem>
      {showTotal && (
        <SectionItem>
          Total: £<Cost cost={basket.cost} />
        </SectionItem>
      )}
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
