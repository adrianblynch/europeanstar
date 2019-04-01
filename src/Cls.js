import React from "react"

const Cls = props => {
  const { index, prices, remaining, isNotAvailable, selected, clsSelected } = props
  const showSoldOut = !isNotAvailable && remaining === 0
  const showPrice = !showSoldOut && prices && prices.adult
  const onClick = clsSelected(index)

  return (
    <div onClick={onClick}>
      {isNotAvailable && <span>N/A</span>}
      {showSoldOut && <span>Sold out</span>}
      {showPrice && (
        <span>
          £{prices.adult} ({remaining} left) {selected && "SELECTED"}
        </span>
      )}
    </div>
  )
}
export default Cls
