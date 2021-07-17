import { useEffect, useState } from "react";
import { COLLECTION_TODOS } from "../../../services/firebase";
import { firebaseConnect } from "../../../utils";
import { valueFilterBtns, valueOfTask } from "../constant";
import { TodoContext } from "../contextAPI";

const firebaseConn = firebaseConnect(COLLECTION_TODOS);

const getToggleValue = (value) => {
    return value === valueOfTask.DONE ? valueOfTask.ACTIVE : valueOfTask.DONE;
};

export const TodolistContainer = (props) => {
    const [dataState, setData] = useState(null);
    const [toggle, setToggle] = useState(valueOfTask.ACTIVE);
    const [filter, setFilter] = useState(valueFilterBtns.ALL);

    const handleAddItem = (newItem) => {
        const item = { name: newItem, isActive: valueOfTask.ACTIVE };
        firebaseConn.setItem(item, () => {
            handleGetList();
            setFilter(valueFilterBtns.ALL);
        });
    };

    const onChangeCheckbox = (checked, item) => {
        const isActive = checked ? valueOfTask.DONE : valueOfTask.ACTIVE;
        firebaseConn.updateItem(item.id, { isActive }, () => handleGetList());
    };

    const onClickToggleAll = () => {
        if (!dataState && dataState.length === 0) return;

        let toggleValue = getToggleValue(toggle);
        dataState.map((item) => {
            item.isActive = toggleValue;
            return item;
        });
        if (filter !== valueFilterBtns.ALL) {
            toggleValue = getToggleValue(filter);
            dataState
                .filter((item) => item.isActive === filter)
                .map((item) => {
                    item.isActive = toggleValue;
                    return item;
                });
        }
        firebaseConn.updateList(dataState, () => {
            setToggle(toggleValue);
            handleGetList();
        });
    };

    const handleFilterItem = (filterValue) => {
        setFilter(filterValue);
    };

    const handleRemoveItem = (id) => {
        firebaseConn.deleteItem(id, () => {
            handleGetList();
        });
    };

    const handleGetList = () => {
        firebaseConn.getList((data) => {
            setData(data);
        });
    };

    useEffect(() => {
        handleGetList();
    }, []);

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
                handleRemoveItem
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
};
