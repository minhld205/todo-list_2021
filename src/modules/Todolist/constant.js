export const valueOfTask = {
    ACTIVE: 1,
    DONE: 2
};

export const valueFilterBtns = {
    ALL: 666,
    DONE: valueOfTask.DONE,
    ACTIVE: valueOfTask.ACTIVE
};

export const filterBtns = [
    {
        name: "ALL",
        className: "filter-all",
        value: valueFilterBtns.ALL
    },
    {
        name: "DONE",
        className: "filter-done",
        value: valueFilterBtns.DONE
    },
    {
        name: "ACTIVE",
        className: "filter-active",
        value: valueFilterBtns.ACTIVE
    }
];
