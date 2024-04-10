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
    { label: '08:30', value: '08:30', checked: false },
    { label: '10:15', value: '10:15', checked: false },
    { label: '12:00', value: '12:00', checked: false },
    { label: '13:50', value: '13:50', checked: false },
    { label: '15:40', value: '15:40', checked: false },
    { label: '17:25', value: '17:25', checked: false },
    { label: '19:10', value: '19:10', checked: false },
];

function Index() {
    
    const navigate = useNavigate();

    const [weekDayTime, setWeekDayTime] = useState({week: "numerator", day: [], time: []})
    const {tg} = useTelegram();
    tg.expand();
    tg.setHeaderColor("#000")

    
    useEffect(() => {
        console.log(weekDayTime)
        if (weekDayTime.day.length && weekDayTime.time.length) {

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [weekDayTime]);

    const location = useLocation();

    const [dayOptions, setDayOptions] = useState(days);
    const [timeOptions, setTimeOptions] = useState(times);

    useEffect(() => {
        setDayOptions(dayOptions);
        setTimeOptions(timeOptions);
        const selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.short);
        const selectedTimes = timeOptions.filter(option => option.checked).map(option => option.value);
        const optionSvg = document.getElementById(`myBtn`);
        if (optionSvg) {
            optionSvg.style.background = selectedTimes.length && selectedDays.length ? '#006CDC' : 'transparent';
            optionSvg.style.border = selectedTimes.length && selectedDays.length ? 'none' : '1px solid #fff';
        }
    }, [dayOptions, timeOptions])

    var selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.short);
    var selectedTimes = timeOptions.filter(option => option.checked).map(option => option.value);

    const onMainButtonClick = () => {
            weekDayTime.day = dayOptions.filter(option => option.checked).map(option =>  option.value);
            weekDayTime.time = timeOptions.filter(option => option.checked).map(option => option.value);
        if (weekDayTime.day.length && weekDayTime.time.length) {
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
                    />
                    <Mydropdown defaultValue={selectedTimes.length ? selectedTimes.join(", ") : "Время"}
                                hasImage={true}
                                textWidth={"28vw"}
                                options={timeOptions} setOptions={setTimeOptions}
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