import React from 'react';
import "./Button.css"
const Button = ({name, onClick}) => {
    return (
        <button className={'myButton'} id="myBtn" onClick={onClick}>{name}</button>
    );
};

export default Button;