import styled, { css } from "styled-components";

const backgroundColorPrimary = "#007bff";
const backgroundColorSecondary = "#28a745";

export const ButtonStyled = styled.button`
    background-color: #fff;
    padding: 10px 15px;
    border-radius: 5px;
    border: 1px solid #d2d2d2;
    cursor: pointer;
    font-size: 14px;
    text-transform: capitalize;
    color: #000;

    ${(props) => {
        if (props.primary) {
            return css`
                background-color: ${backgroundColorPrimary};
                border-color: ${backgroundColorPrimary};
                color: white;
            `;
        }

        if (props.secondary) {
            return css`
                background-color: ${backgroundColorSecondary};
                border-color: ${backgroundColorSecondary};
                color: white;
            `;
        }
    }}
`;
