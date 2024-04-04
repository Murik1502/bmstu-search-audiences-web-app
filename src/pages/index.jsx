import React, {useEffect, useState} from 'react';
import WeekDaySelector from "../components/WeekDaySelector";




function Index() {

    const [weekDay, setWeekDay] = useState({week: "numerator", day: ""})

    useEffect(() => {
        console.log(weekDay)
    }, [weekDay, setWeekDay]);

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