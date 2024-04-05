import React from 'react';
import "./listItem.css"
const ListItem = ({number, time}) => {
    return (
        <div className="item">
            <label className="item-label">{number+" | "+time}</label>
        </div>
    );
};

export default ListItem;