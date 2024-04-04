import React, {useEffect, useState} from 'react';
import WeekDaySelector from "../components/WeekDaySelector";
import {useTelegram} from "../hooks/useTelegram";
import {useNavigate} from "react-router-dom";




function Index() {
    
    const navigate = useNavigate();

    const [weekDay, setWeekDay] = useState({week: "numerator", day: ""})
    const {tg} = useTelegram();


    const onMainButtonClick = () => {
        tg.MainButton.hide();
        navigate('/list', { state: { data: weekDay } });
    }
    
    useEffect(() => {
        console.log(weekDay)
        if (weekDay.day !== "") {
            tg.MainButton.setText("Найти")
            tg.MainButton.show()
            tg.MainButton.onClick(onMainButtonClick);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekDay, navigate, tg]);

    

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