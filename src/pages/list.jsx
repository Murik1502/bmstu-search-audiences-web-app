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
    return (
        <div>
            
        </div>
    );
};

export default List;