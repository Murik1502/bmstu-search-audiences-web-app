import React from 'react';
import Mydropdown from "./dropdown/mydropdown";

const levels = [
    { label: '1', value: '1', checked: false },
    { label: '2', value: '2', checked: false },
    { label: '4', value: '4', checked: false },
    { label: '5', value: '5', checked: false },
    { label: '6', value: '6', checked: false },
    { label: '7', value: '7', checked: false },
    { label: '8', value: '8', checked: false },
    { label: '9', value: '9', checked: false },
    { label: '11', value: '11', checked: false },
];

const times = [
    { label: '08:30', value: '08:30', checked: false },
    { label: '10:15', value: '10:15', checked: false },
    { label: '12:00', value: '12:00', checked: false },
    { label: '13:50', value: '13:50', checked: false },
    { label: '15:40', value: '15:40', checked: false },
    { label: '17:25', value: '17:25', checked: false },
    { label: '19:10', value: '19:10', checked: false },
];

const FloorTimeSelector = () => {

    return (
        <div className="dropdown-wrapper">
            <Mydropdown defaultValue="Этаж" initialOptions={levels}/>
            <Mydropdown defaultValue="Время" initialOptions={times}/>
        </div>
    );
};

export default FloorTimeSelector;