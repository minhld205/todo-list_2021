import { useMemo } from "react";
import { Button } from "../../../components/Button";
import { withContextTodolist } from "../contextAPI";

export const ButtonToggleDefault = (props) => {
    return useMemo(() => {
        return (
            <Button primary className={"btn btn---toggle-all"} onClick={props.onClickToggleAll}>
                <span>{"Toggle All"}</span>
            </Button>
        );
    }, [props.data, props.filter]);
};

export const ButtonToggle = withContextTodolist(ButtonToggleDefault);
