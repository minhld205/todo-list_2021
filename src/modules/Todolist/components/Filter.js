import { useMemo } from "react";
import styled from "styled-components";
import { Button } from "../../../components/Button";
import { filterBtns } from "../constant";
import { withContextTodolist } from "../contextAPI";

const WrapperFilterStyled = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
    margin-top: 16px;
`;

export const FilterDefault = (props) => {
    const onClick = (filterValue) => {
        props.handleFilterItem && props.handleFilterItem(filterValue);
    };

    return useMemo(() => {
        return (
            <WrapperFilterStyled className={"block-filter"}>
                <span>{"Filters"}</span>
                {filterBtns.map((item, index) => {
                    return (
                        <Button
                            key={index}
                            className={item.className}
                            onClick={() => onClick(item.value)}
                            secondary={props.filter === item.value}
                        >
                            <span>{item.name}</span>
                        </Button>
                    );
                })}
            </WrapperFilterStyled>
        );
    }, [props.filter]);
};

export const Filter = withContextTodolist(FilterDefault);
