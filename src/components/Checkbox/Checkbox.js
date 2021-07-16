import { useEffect, useRef, useState } from "react";
import { CheckboxStyled, WrapperCheckboxStyled } from "./CheckboxStyled";

export const Checkbox = (props) => {
    const checkboxElRef = useRef(null);

    const [isChecked, setIsChecked] = useState(props.checked);

    const onChange = (id) => {
        props.onChange && props.onChange(checkboxElRef.current.checked, id);
        setIsChecked(checkboxElRef.current.checked);
    };

    const handleRemoveItem = (id) => {
        props.handleRemoveItem && props.handleRemoveItem(id);
    };

    useEffect(() => {
        setIsChecked(props.checked);
    }, [props.checked]);

    return (
        <WrapperCheckboxStyled className={"input--checkbox"}>
            <CheckboxStyled
                {...props}
                id={props.id}
                type="checkbox"
                ref={checkboxElRef}
                onChange={() => onChange(props.id)}
                checked={isChecked}
            />
            {props.label && <label htmlFor={props.id}>{props.label}</label>}
            {props.handleRemoveItem && (
                <a
                    className={"remove-item cursor-pointer"}
                    href={"#"}
                    onClick={() => handleRemoveItem(props.id)}
                >
                    x
                </a>
            )}
        </WrapperCheckboxStyled>
    );
};
