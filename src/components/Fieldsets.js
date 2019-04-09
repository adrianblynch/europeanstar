import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Fieldsets = styled.div`
  ${breakpoint("md")`
    display: flex;
    flex-direction: row;
  `}
`
Fieldsets.defaultProps = { "data-id": "Fieldsets" }

export default Fieldsets
