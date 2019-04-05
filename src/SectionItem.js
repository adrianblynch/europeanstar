import styled from "styled-components"

const SectionItem = styled.div`
  --radius: 5px;

  display: flex;
  flex-direction: column;

  background-color: white;
  color: #55565a;
  margin-bottom: 2px;
  padding: 15px 15px;

  &:first-of-type {
    border-top-left-radius: var(--radius);
    border-top-right-radius: var(--radius);
  }
  &:last-of-type {
    border-bottom-left-radius: var(--radius);
    border-bottom-right-radius: var(--radius);
  }
`

SectionItem.defaultProps = {
  "data-id": "SectionItem"
}

export default SectionItem
