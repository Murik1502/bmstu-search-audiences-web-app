import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import FloorTimeSelector from "../components/FloorTimeSelector";

function List () {

    const location = useLocation();
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

    const weekDayData = location.state.data
    console.log("week day", weekDayData);


    return (
        <div>
            <FloorTimeSelector/>
        </div>
    );
}

export default List;