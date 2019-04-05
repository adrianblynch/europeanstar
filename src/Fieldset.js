import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Fieldset = styled.div`
  --borderColour: #888;
  --backgroundColour: #f8f8f8;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 14px;
  margin-top: 10px;

  ${breakpoint("md")`
    margin-top: 0;
    margin-left: 10px;
  `}

  &:first-child {
    margin-top: 0;
    margin-left: 0;
  }

  & > label {
    font-size: inherit;
    color: #55565a;
    padding: 0;
    margin: 0;
  }

  & > input[type="text"] {
    font-size: inherit;
    background-color: var(--backgroundColour);
    border: 1px solid var(--borderColour);
    border-radius: 5px;
  }

  & > select {
    font-size: inherit;
    background-color: var(--backgroundColour);
    border: 1px solid var(--borderColour);
    border-radius: 5px;
  }
`
Fieldset.defaultProps = {
  "data-component": "Fieldset"
}

export default Fieldset
