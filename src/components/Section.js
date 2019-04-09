import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Section = styled.div`
  background-color: #06183d;
  color: white;
  padding: 16px;
  margin-top: 16px;
  ${breakpoint("md")`
    border-radius: 5px;
  `}
`

Section.defaultProps = {
  "data-id": "Section"
}

export default Section
