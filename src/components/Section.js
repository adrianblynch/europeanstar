import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Section = styled.div`
  background-color: #06183d;
  color: white;
  padding: 16px;
  margin: 16px 0;
  ${breakpoint("md")`
    border-radius: 5px;
  `}
`

Section.defaultProps = {
  "data-component": "Section"
}

export default Section
