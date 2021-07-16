import { ButtonStyled } from "./ButtonStyled";

export const Button = (props) => {
    const onClick = () => {
        props.onClick && props.onClick();
    };

    return (
        <ButtonStyled type="button" {...props} onClick={onClick}>
            {props.children}
        </ButtonStyled>
    );
};
