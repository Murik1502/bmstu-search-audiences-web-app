import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import Slider from "../components/slider/slider";
import Button from "../components/Button/Button";
import Footer from "../components/Footer/Footer";

const days = [
    { label: 'Понедельник', short: 'Пн', value: 'monday', checked: false },
    { label: 'Вторник', short: 'Вт', value: 'tuesday', checked: false },
    { label: 'Среда', short: 'Ср', value: 'wednesday', checked: false },
    { label: 'Четверг', short: 'Чт', value: 'thursday', checked: false },
    { label: 'Пятница', short: 'Пт', value: 'friday', checked: false },
    { label: 'Суббота', short: 'Сб', value: 'saturday', checked: false }
];

const times = [
    { label: '08:30 - 10:05', value: '08:30', end: '10:05', checked: false },
    { label: '10:15 - 11:50', value: '10:15', end: '11:50', checked: false },
    { label: '12:00 - 13:35', value: '12:00', end: '13:35', checked: false },
    { label: '13:50 - 15:25', value: '13:50', end: '15:25', checked: false },
    { label: '15:40 - 17:15', value: '15:40', end: '17:15', checked: false },
    { label: '17:25 - 19:00', value: '17:25', end: '19:00', checked: false },
    { label: '19:10 - 20:45', value: '19:10', end: '20:45', checked: false },
];

function mergeAdjacentCheckedTimes(times) {
    const selectedTimes = [];

    for (let i = 0; i < times.length; i++) {
        if (times[i].checked) {
            let start = times[i].value;
            let end = times[i].end;
            let j = i + 1;
            while (j < times.length && times[j].checked) {
                end = times[j].end;
                j++;
            }
            selectedTimes.push(`${start} - ${end}`);
            i = j - 1;
        }
    }
    return selectedTimes;
}


function Index() {
    
    const navigate = useNavigate();

    const [weekDayTime, setWeekDayTime] = useState({week: "numerator", day: "", times: []})
    const {tg} = useTelegram();
    tg.expand();
    tg.setHeaderColor("#000")

    const location = useLocation();

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
            console.log(weekDayTime)
            navigate('/list', { state: { data: weekDayTime } });

        }
    }

    return (
        <div className={"wrap"}>
                <h1 className={"header"}>Поиск свободных аудиторий</h1>
                <Slider weekDay={weekDayTime} setWeekDay={setWeekDayTime}/>
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
            <div className={"myBtn-wrap"}>
                <Button name={"Найти"} onClick={onMainButtonClick}/>
            </div>
            <Footer/>
        </div>
    );
}

export default Index;