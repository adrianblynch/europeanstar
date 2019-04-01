/*const nowAsString = new Date().toString()

console.log("nowAsString", nowAsString)

const nowAsObject = new Date(nowAsString)

console.log("nowAsObject", nowAsObject)*/

// Date now = new Date(Date.now())
// const dateString = now.toString()
// Date then = new Date(dateString)

const data = require("./prices.json")

const transformPriceDataForState = ({ journey: journeys }) => {
  return journeys.map(data => {
    const { id, departureTime, arrivalTime, duration, direct, class: cls } = data

    const classes = cls.map(({ isCheapest, remaining, price: prices }) => {
      return {
        isCheapest,
        remaining,
        prices
      }
    })

    return {
      id,
      departureTime,
      arrivalTime,
      duration,
      direct,
      classes
    }
  })
}

console.log("", JSON.stringify(transformPriceDataForState(data.outbound), null, 2))
transformPriceDataForState(data.outbound)
