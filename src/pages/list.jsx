import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useNavigate} from "react-router-dom";

const List = () => {
    const navigate = useNavigate();
    const {toggleBackButton, tg} = useTelegram();

    const onBackButtonClick = () => {
        tg.BackButton.offClick(onBackButtonClick);
        toggleBackButton();
        navigate('/');
    }

    if (!tg.BackButton.isVisible) {
        toggleBackButton();
        tg.BackButton.onClick(onBackButtonClick);
    }

    const weekDayData = {
        "week": tg.CloudStorage.getItem("week"),
        "day" : tg.CloudStorage.getItem("day")
    }
    console.log(weekDayData);
    console.log(tg.CloudStorage.getItem());

    return (

        <div>

        </div>
    );
};

export default List;