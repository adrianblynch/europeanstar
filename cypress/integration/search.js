const FIRST_TRAIN = 0
const STANDARD = "standard"
const STANDARD_PREMIER = "standard premier"
const BUSINESS_PREMIER = "business premier"
const CLASS_INDEXES = { [STANDARD]: 1, [STANDARD_PREMIER]: 2, [BUSINESS_PREMIER]: 3 }
const OUTBOUND = "outbound"
const INBOUND = "inbound"

const getTrainFare = (direction, trainIndex = FIRST_TRAIN, cls = STANDARD) => {
  return cy
    .get(`#${direction} div[data-component='StyledTrain']`)
    .eq(trainIndex)
    .find(`div[data-component='StyledCls']:nth-of-type(${CLASS_INDEXES[cls.toLowerCase()]})`)
}

describe("Search", () => {
  it("loads outbound and inbound fares", () => {
    cy.server()
    cy.route({
      method: "GET",
      url: "**/train-search/**",
      response: "fixture:london-paris-return-1a-0y-0c.json"
    })

    cy.visit("/")

    cy.contains("h2", "Search")
    cy.contains("button", "Search").click()

    cy.get("#outbound").within(() => {
      cy.contains("h2", "Outbound")
      cy.contains("Standard")
      cy.contains("Standard Premier")
      cy.contains("Business Premier")
    })

    cy.get("#inbound").within(() => {
      cy.contains("h2", "Inbound")
      cy.contains("Standard")
      cy.contains("Standard Premier")
      cy.contains("Business Premier")
    })
  })

  it("has empty basket", () => {
    cy.get("#basket").within(() => {
      cy.contains("Basket")
      cy.contains("Select your outbound train")
      cy.contains("Select your inbound train")
      cy.contains("Total:")
      cy.contains("£0.00")
      cy.get("button").should("be.disabled")
    })
  })

  it("basket is populated upon fare selection", () => {
    // Select outbound fare
    getTrainFare(OUTBOUND, FIRST_TRAIN, STANDARD).click()

    cy.get("#outbound").within(() => {
      cy.contains("View all trains")
    })

    cy.get("#basket").within(() => {
      cy.contains("London to Paris")
      cy.contains("1 x Standard adult - £49.00")
      cy.contains("Select your inbound train")
      cy.contains("Total: £49.00")
      cy.get("button").should("be.disabled")
    })

    // Select inbound fare
    getTrainFare(INBOUND, FIRST_TRAIN, STANDARD).click()

    cy.get("#inbound").within(() => {
      cy.contains("View all trains")
    })

    cy.get("#basket").within(() => {
      cy.contains("Paris to London")
      cy.contains("1 x Standard adult - £49.00")
      cy.contains("Total: £98.00")
      cy.get("button").should("not.be.disabled")
    })
  })

  it("basket is updated on fare change", () => {
    // Change inbound to Standard Premier
    getTrainFare(INBOUND, FIRST_TRAIN, STANDARD_PREMIER).click()

    cy.get("#basket").within(() => {
      cy.contains("1 x Standard Premier adult - £119.00")
      cy.contains("Total: £168.00")
    })

    // Change outbound to Business Premier
    getTrainFare(OUTBOUND, FIRST_TRAIN, BUSINESS_PREMIER).click()

    cy.get("#basket").within(() => {
      cy.contains("1 x Business Premier adult - £245.00")
      cy.contains("Total: £364.00")
    })
  })

  it("`View all trains` shows all trains", () => {
    const trainSelector = "div[data-component='StyledTrain']"
    cy.get("#outbound").within(() => {
      cy.get(trainSelector).should("have.length", 1)
      cy.get("button").click()
      cy.get(trainSelector).should("have.length.gt", 1)
    })
  })
})
