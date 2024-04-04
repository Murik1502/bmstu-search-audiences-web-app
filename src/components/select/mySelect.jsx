import React from 'react';
import "./mySelect.css"
const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <select
            className={"mySelect"}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled selected value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
};

export default MySelect;