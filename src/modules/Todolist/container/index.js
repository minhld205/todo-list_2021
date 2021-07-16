import { useState } from "react";
import { valueFilterBtns, valueOfTask } from "../constant";
import { initData, TodoContext } from "../contextAPI";

let genItemId = 9;

export const TodolistContainer = (props) => {
    const [dataState, setData] = useState(initData.data);
    const [toggle, setToggle] = useState(valueOfTask.ACTIVE);
    const [filter, setFilter] = useState(valueFilterBtns.ALL);

    const handleAddItem = (newItem) => {
        let newData = [...dataState];
        newData.push({ id: ++genItemId, name: newItem, isActive: valueOfTask.ACTIVE });
        setData(newData);
        setFilter(valueFilterBtns.ALL);
    };

    const onChangeCheckbox = (checked, id) => {
        const newData = dataState.map((item) => {
            let newItem = item;
            if (item.id === id && checked) {
                newItem = { ...newItem, isActive: valueOfTask.DONE };
            }
            return newItem;
        });
        setData(newData);
    };

    const handleRemoveItem = (id) => {
        const newData = dataState.filter((item) => item.id !== id);
        setData(newData);
    };

    const onClickToggleAll = () => {
        const toggleValue = toggle === valueOfTask.ACTIVE ? valueOfTask.DONE : valueOfTask.ACTIVE;
        const newData = dataState.map((item) => ({ ...item, isActive: toggleValue }));
        setData(newData);
        setToggle(toggleValue);
        setFilter(valueFilterBtns.ALL);
    };

    const handleFilterItem = (filterValue) => {
        setFilter(filterValue);
    };

    return (
        <TodoContext.Provider
            value={{
                data: dataState,
                filter,
                toggle,
                handleAddItem,
                onChangeCheckbox,
                onClickToggleAll,
                handleFilterItem,
                handleRemoveItem,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
