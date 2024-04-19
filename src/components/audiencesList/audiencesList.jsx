import React from 'react';
import ListItem from "../listItem/listItem";
import "./audiencesList.css";

const AudiencesList = ({ items, floors }) => {
    return (
        <div className="audiences-list">
            {floors.map((floor, floorIndex) => {
                if (floor.checked === true && items.filter(item => item.floor === floor.value).length !== 0) {
                    return (
                        <div key={floorIndex} className="floor-audiences">
                            <div className="floor">{floor.value + " этаж"}</div>
                            <div className="audiences-line">
                                {items.map((item, itemIndex) => {
                                    if (item.floor === floor.value) {
                                        return (
                                            <ListItem key={itemIndex} number={item.number} time={item.time}></ListItem>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>
    );
};

export default AudiencesList;
