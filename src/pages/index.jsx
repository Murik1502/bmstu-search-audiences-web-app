import React, {useEffect, useState} from 'react';
import WeekDaySelector from "../components/WeekDaySelector";
import {useTelegram} from "../hooks/useTelegram";




function Index() {

    const [weekDay, setWeekDay] = useState({week: "numerator", day: ""})
    const {toggleMainButton, tg} = useTelegram();
    useEffect(() => {
        console.log(weekDay)
    }, [weekDay, setWeekDay]);

    if (weekDay.day !== "") {
        //tg.MainButton.text("Найти")
        toggleMainButton()
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