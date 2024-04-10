import React from 'react';
import "./slider.css";

const Slider = ({weekDay, setWeekDay}) => {
    return (
            <div className="custom-checkbox">
                <input id="status" type="checkbox" name="status"/>
                    <label htmlFor="status">
                        <div className="status-switch"
                             onClick={() => setWeekDay({ ...weekDay, week: weekDay.week === "numerator" ? "denominator" : "numerator"
                             })}
                             data-unchecked="Числитель"
                             data-checked="Знаменатель"/>
                    </label>
            </div>
    );
};

export default Slider;