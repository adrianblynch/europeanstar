import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const SectionItem = styled.div`
  --radius: 5px;
  background-color: white;
  color: #55565a;
  margin-bottom: 2px;
  padding: 15px 20px;

  ${breakpoint("md")`
    display: flex;
  `}

  &:first-of-type {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
  &:last-of-type {
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
`

export default SectionItem
