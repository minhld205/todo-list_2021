import { useMemo, useRef } from "react";
import { InputStyled, WrapperInputStyled } from "./InputStyled";

const LabelInputText = ({ label }) => {
    let newLabel = null;
    if (label) rewLabel = <label>{label}</label>;
    return newLabel;
};

export const Input = (props) => {
    const inputElRef = useRef(null);

    const onChange = () => {
        props.onChange && props.onChange(inputElRef.current.value);
    };

    return (
        <WrapperInputStyled>
            <LabelInputText label={props.label} />
            <InputStyled {...props} type="text" ref={inputElRef} onChange={onChange} />
        </WrapperInputStyled>
    );
};
