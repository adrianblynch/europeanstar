import styled from "styled-components"

const Button = styled.button`
  background-color: #fbdd0f;
  color: #55565a;
  font-size: 22px;
  width: 100%;
  margin-top: 12px;
  padding: 12px;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  &:hover {
    background-color: #ffea6a;
  }
  &:disabled {
    background-color: #e6e6e7;
  }
`

export default Button
