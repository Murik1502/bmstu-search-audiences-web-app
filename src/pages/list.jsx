import React from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";

const List = () => {

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

    fetch(`http://localhost:3333/get?week=${weekDayData.week}&day=${weekDayData.day}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Response data:', data);
            // Ваш код для обработки полученных данных
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
        });


    return (

        <div>

        </div>
    );
};

export default List;