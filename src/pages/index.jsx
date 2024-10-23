import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import Button from "../components/Button/Button";
import Footer from "../components/Footer/Footer";
import {days, times} from "../data/data"
import {mergeAdjacentCheckedTimes} from "../data/functions";
import MyCheckbox from "../components/myCheckbox/myCheckbox";


function Index() {
    
    const navigate = useNavigate();

    const [weekDayTime, setWeekDayTime] = useState({week: "numerator", day: "", times: []})

    const [dayOptions, setDayOptions] = useState(days);
    const [timeOptions, setTimeOptions] = useState(times);

    useEffect(() => {
        setDayOptions(dayOptions);
        setTimeOptions(timeOptions);
        const selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.short);
        const selectedTimes = mergeAdjacentCheckedTimes(timeOptions);
        const optionSvg = document.getElementById(`myBtn`);
        if (optionSvg) {
            optionSvg.style.background = selectedTimes.length && selectedDays.length ? '#006CDC' : 'transparent';
            optionSvg.style.border = selectedTimes.length && selectedDays.length ? 'none' : '1px solid #fff';
        }
    }, [dayOptions, timeOptions])

    var selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.label);
    var selectedTimes = mergeAdjacentCheckedTimes(timeOptions);

    const onMainButtonClick = () => {
            weekDayTime.day = dayOptions.filter(option => option.checked).map(option =>  option.value);
            weekDayTime.times = timeOptions.filter(option => option.checked).map(option => option.value);
        if (weekDayTime.day.length && weekDayTime.times.length) {
            navigate('/list', { state: { data: weekDayTime } });

        }
    }

    return (
        <div className={"wrap"}>
            <h1 className={"header"}>Поиск свободных аудиторий</h1>
            <MyCheckbox weekDay={weekDayTime} setWeekDay={setWeekDayTime}/>
            <div className="dropdown-wrapper">
                <Mydropdown defaultValue={selectedDays.length ? selectedDays.join(", ") : "День недели"}
                            hasImage={true}
                            textStyle={"28vw"}
                            options={dayOptions} setOptions={setDayOptions}
                            multipleSelection={false}
                />
                <Mydropdown defaultValue={selectedTimes.length ? selectedTimes.join(", ") : "Время"}
                            hasImage={true}
                            textWidth={"28vw"}
                            options={timeOptions} setOptions={setTimeOptions}
                            multipleSelection={true}
                />
            </div>

            <div className={"flex-space"}></div>
            <Button name={"Найти"} onClick={onMainButtonClick}/>
            <Footer/>
        </div>
    );
}

export default Index;