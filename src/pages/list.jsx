import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {Navigate} from "react-router-dom";

const List = () => {

    const {toggleBackButton, tg} = useTelegram();

    const onBackButtonClick = () => {
        toggleBackButton();
        return <Navigate to="/"/>;
    }

    if (!tg.BackButton.isVisible)
        toggleBackButton();
    tg.BackButton.onClick(onBackButtonClick)

    return (
        <div>
            
        </div>
    );
};

export default List;