import React from 'react';
import ListItem from "../listItem/listItem";
import "./audiencesList.css"


const AudiencesList = ({ items, floors }) => {

    return (
        <div className="audiences-list">
            {floors.map((floor, index) => (floor.checked &&  items.filter(item => item.floor === floor.value).length !== 0 &&
                (<div key={index} className="floor-audiences">
                    <div className="floor">{floor.value+" этаж"}</div>
                    <div className="audiences-line">
                        {items.map((item, idx) =>
                            item.floor === floor.value &&
                            <ListItem key={index} number={item.number} time={item.time}></ListItem>
                        )}
                    </div>
                </div>)
            ))}
        </div>
    );
};

export default AudiencesList;