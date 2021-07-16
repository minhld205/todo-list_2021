import { useRef } from "react";
import { Input } from "../../../components/Input";
import { withContextTodolist } from "../contextAPI";

export const FormInputDefault = (props) => {
    const formElRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        const valueInput = e.target[0].value;

        if (valueInput.trim().length > 0) {
            props.handleAddItem && props.handleAddItem(valueInput);
            formElRef.current.reset();
        }
    };

    return (
        <form onSubmit={onSubmit} ref={formElRef}>
            <Input className={"input-todo"} placeholder={"Enter todo name here"} />
        </form>
    );
};

export const FormInput = withContextTodolist(FormInputDefault);
