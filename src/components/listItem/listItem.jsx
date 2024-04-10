import React from 'react';
import "./listItem.css"
const ListItem = ({number, time}) => {
    return (
        <div className="audience">
            <div className="audience-number">{number}</div>
            <div className="time">{time}</div>
        </div>
    );
};

export default ListItem;