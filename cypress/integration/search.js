describe("Search", () => {
  it("loads outbound and inbound fares", () => {
    cy.visit("http://localhost:3000")

    cy.contains("h2", "Search")
    cy.contains("button", "Search").click()
    cy.contains("h2", "Outbound")
    cy.contains("h2", "Inbound")
  })

  it("has empty basket", () => {
    cy.get("#basket").within(basket => {
      cy.contains("Basket")
      cy.contains("Select your outbound train")
      cy.contains("Select your inbound train")
      cy.contains("Total:")
      cy.contains("£0.00")
    })
  })

  it("basket is populated upon fare selection", () => {})
})
