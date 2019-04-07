import styled from "styled-components"
import breakpoint from "styled-components-breakpoint"

const Fieldset = styled.div`
  --borderColour: #888;
  --backgroundColour: #f8f8f8;
  --fontColour: #555;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 22px;
  margin-top: 10px;

  ${breakpoint("md")`
    margin-top: 0;
    margin-left: 10px;
    font-size: 18px;
  `}

  ${breakpoint("lg")`
    font-size: 16px;
  `}

  &:first-child {
    margin-top: 0;
    margin-left: 0;
  }

  & > label {
    font-size: 14px;
    color: #55565a;
    padding: 0;
    margin: 0;
  }

  & > input[type="text"] {
    font-size: inherit;
    background-color: var(--backgroundColour);
    border: 1px solid var(--borderColour);
    border-radius: 5px;
    padding-left: 5px;
    color: var(--fontColour);
  }

  & > select {
    font-size: inherit;
    background-color: var(--backgroundColour);
    border: 1px solid var(--borderColour);
    border-radius: 5px;
    color: var(--fontColour);
  }
`
Fieldset.defaultProps = {
  "data-component": "Fieldset"
}

export default Fieldset
