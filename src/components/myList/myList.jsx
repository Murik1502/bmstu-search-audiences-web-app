import React from 'react';
import "./myList.css";

const MyList = () => {
    return (
        <div className={`Mylist-wrapper`}>
            <div className="options-line">
                <div className="filter"><img className="settings-svg"
                                             alt=""/></div>
                <div className="list-option">Чс</div>
                <div className="list-option">Вт, Ср</div>
                <div className="list-option">8:30, 12:00</div>
            </div>
            <div className="audiences-list">
                <div className="floor-audiences">
                    <div className="floor">1 этаж</div>
                    <div className="audiences-line">
                        <div className="audience">
                            <div className="audience-number">709л</div>
                            <div className="time">8:30 – 12:00</div>
                        </div>
                        <div className="audience">
                            <div className="audience-number">709л</div>
                            <div className="time">8:30 – 12:00</div>
                        </div>
                        <div className="audience">
                            <div className="audience-number">709л</div>
                            <div className="time">8:30 – 12:00</div>
                        </div>
                        <div className="audience">
                            <div className="audience-number">709л</div>
                            <div className="time">8:30 – 12:00</div>
                        </div>
                        <div className="audience">
                            <div className="audience-number">709л</div>
                            <div className="time">8:30 – 12:00</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyList;