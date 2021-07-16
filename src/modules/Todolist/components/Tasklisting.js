import { useMemo } from "react";
import styled from "styled-components";
import { Checkbox } from "../../../components/Checkbox";
import { valueFilterBtns, valueOfTask } from "../constant";
import { withContextTodolist } from "../contextAPI";
import { ButtonToggle } from "./ButtonToggle";

const WrapperTasklisting = styled.div`
    text-align: left;
    margin-top: 16px;

    .task-listing {
        > div {
            display: flex;
            align-items: flex-start;
            width: 100%;
            justify-content: space-between;

            a {
                margin-left: auto;
                padding: 1px 6px;
                background: #dc3545;
                border-radius: 5px;
                color: #fff;
                text-decoration: none;
            }
        }

        > div + div {
            margin-top: 8px;
        }

        input {
            min-height: 20px;
            min-width: 20px;
            margin: 0;
        }

        input:checked + label {
            text-decoration: line-through;
        }

        label {
            padding-left: 8px;
            line-height: 1.5;
        }

        label,
        input {
            cursor: pointer;
        }
    }

    button {
        margin-top: 16px;
    }
`;

const Listing = ({ data, filter, handleRemoveItem, onChange }) => {
    return (
        <div className={"task-listing"}>
            {data.map((item, index) =>
                item.isActive === filter || filter === valueFilterBtns.ALL ? (
                    <Checkbox
                        key={index}
                        id={item.id}
                        label={item.name}
                        handleRemoveItem={handleRemoveItem}
                        checked={item.isActive === valueOfTask.DONE}
                        onChange={onChange}
                    />
                ) : null
            )}
        </div>
    );
};

export const TasklistingDefault = (props) => {
    return useMemo(() => {
        return props.data && props.data.length ? (
            <WrapperTasklisting>
                <Listing
                    data={props.data}
                    filter={props.filter}
                    handleRemoveItem={props.handleRemoveItem}
                    onChange={props.onChangeCheckbox}
                />
                <ButtonToggle />
            </WrapperTasklisting>
        ) : (
            <div className={"empty-data"}>{"no data"}</div>
        );
    }, [props.data, props.filter]);
};

export const Tasklisting = withContextTodolist(TasklistingDefault);
