import React from 'react';
import "./slider.css";

const Slider = () => {
    return (
            <div className="custom-checkbox">
                <input id="status" type="checkbox" name="status"/>
                    <label for="status">
                        <div className="status-switch" data-unchecked="Числитель"  data-checked="Знаменатель"/>
                    </label>
            </div>
    );
};

export default Slider;