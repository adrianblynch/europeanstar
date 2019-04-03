import { getDateForUrl, hasPrices } from "./selectors"

describe("selectors", () => {
  describe("getDateForUrl()", () => {
    it("returns a function", () => {
      const result = getDateForUrl("outbound")
      expect(typeof result).toBe("function")
    })

    describe("when returned function is used", () => {
      const getOutboundDateForUrl = getDateForUrl("outbound")

      it("returns a date for initial date formatted string", () => {
        const state = { search: { outboundDate: "2019-03-31T13:01:38.000Z" } }
        const result = getOutboundDateForUrl(state)
        expect(result).toBe("2019-03-31")
      })

      it("returns a date for datepicker date formatted string", () => {
        const state = { search: { outboundDate: "Sun Mar 31 2019 14:01:38 GMT+0000 (Greenwich Mean Time)" } }
        const result = getOutboundDateForUrl(state)
        expect(result).toBe("2019-03-31")
      })
    })
  })
})
