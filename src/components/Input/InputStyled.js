import styled, { css } from "styled-components";

export const InputStyled = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  min-height: 20px;
  border-radius: 5px;
  border: 1px solid #d2d2d2;
`;

export const WrapperInputStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  ${(props) => {
    if (props.isCheckbox) {
      return css`
        flex-direction: row-reverse;
        align-items: center;

        input {
          width: auto;
        }
      `;
    }
  }}
`;
