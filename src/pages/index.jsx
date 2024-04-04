import React, {useEffect, useState} from 'react';
import WeekDaySelector from "../components/WeekDaySelector";
import {useTelegram} from "../hooks/useTelegram";
import {Navigate} from "react-router-dom";




function Index() {

    const onMainButtonClick = () => {
        tg.MainButton.hide();
        return <Navigate to="/list"/>;
    }

    const [weekDay, setWeekDay] = useState({week: "numerator", day: ""})
    const {tg} = useTelegram();
    useEffect(() => {
        console.log(weekDay)
    }, [weekDay, setWeekDay]);

    if (weekDay.day !== "") {
        tg.MainButton.setText("Найти")
        tg.MainButton.show()
        tg.MainButton.onClick(() => onMainButtonClick);
    }

    return (
        <div className={"wrap"}>
            <h1 className={"header"}>Поиск аудитории</h1>
            <WeekDaySelector
            setWeekDay={setWeekDay}
            weekDay={weekDay}/>
        </div>
    );
}

export default Index;