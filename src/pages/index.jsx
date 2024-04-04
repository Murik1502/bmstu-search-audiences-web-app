import React, {useEffect, useState} from 'react';
import WeekDaySelector from "../components/WeekDaySelector";
import {useTelegram} from "../hooks/useTelegram";
import {useHistory} from 'react-router-dom';



function Index() {

    const router = useHistory()

    const [weekDay, setWeekDay] = useState({week: "numerator", day: ""})
    const {tg} = useTelegram();
    useEffect(() => {
        console.log(weekDay)
    }, [weekDay, setWeekDay]);

    if (weekDay.day !== "") {
        tg.MainButton.setText("Найти")
        tg.MainButton.show()
        tg.MainButton.onClick(() => router.push('/list'))
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