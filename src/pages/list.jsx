import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Footer from "../components/Footer/Footer";
import AudiencesList from "../components/audiencesList/audiencesList";

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
const days = [
    { label: 'Понедельник', short: 'Пн', value: 'monday', checked: false },
    { label: 'Вторник', short: 'Вт', value: 'tuesday', checked: false },
    { label: 'Среда', short: 'Ср', value: 'wednesday', checked: false },
    { label: 'Четверг', short: 'Чт', value: 'thursday', checked: false },
    { label: 'Пятница', short: 'Пт', value: 'friday', checked: false },
    { label: 'Суббота', short: 'Сб', value: 'saturday', checked: false },
];

const audiencesArray = [
    {floor: '6', number: "719л", time: "8:30 - 12:00"},
    {floor: '6', number: "719л", time: "8:30 - 12:00"},
    {floor: '6', number: "719л", time: "8:30 - 12:00"},
    {floor: '7', number: "719л", time: "8:30 - 12:00"},
    {floor: '7', number: "719л", time: "8:30 - 12:00"},
    {floor: '7', number: "719л", time: "8:30 - 12:00"},
    {floor: '7', number: "719л", time: "8:30 - 12:00"},
    {floor: '7', number: "719л", time: "8:30 - 12:00"},
    {floor: '8', number: "719л", time: "8:30 - 12:00"},
    {floor: '8', number: "719л", time: "8:30 - 12:00"},
    {floor: '8', number: "719л", time: "8:30 - 12:00"},
    {floor: '9', number: "719л", time: "8:30 - 12:00"},
]

const levels = [
    { label: '1 этаж', value: '1', checked: true },
    { label: '2 этаж', value: '2', checked: true },
    { label: '4 этаж', value: '4', checked: true },
    { label: '5 этаж', value: '5', checked: true },
    { label: '6 этаж', value: '6', checked: true },
    { label: '7 этаж', value: '7', checked: true },
    { label: '8 этаж', value: '8', checked: true },
    { label: '9 этаж', value: '9', checked: true },
    { label: '11 этаж', value: '11', checked: true },
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

const weeks = [
    { label: 'Числитель', short: "Чс", value: 'numerator', checked: false },
    { label: 'Знаменатель', short: "Зн", value: 'denominator', checked: false },
]

function transformData(data) {
    const resultArray = [];
    data.forEach(item => {
        item.time.forEach(time => {
            resultArray.push([item.floor, item.name, time.substr(0, 5)]);
        });
    });

    return resultArray;
}

function List () {

    const location = useLocation();

    const navigate = useNavigate();

    const {toggleBackButton, tg} = useTelegram();

    const onBackButtonClick = () => {
        navigate('/');
        toggleBackButton();
        tg.BackButton.offClick(onBackButtonClick);
    }
    if (!tg.BackButton.isVisible) {
        toggleBackButton();
        tg.BackButton.onClick(onBackButtonClick);
    }
    //
    // //const weekDayData = location.state.data
    // //console.log("week day", weekDayData);
    //
    const [audiences, setAudiences] = useState(audiencesArray)
    const [sortedAudiences, setSortedAudiences] = useState(audiences)
    //
    // // eslint-disable-next-line no-unused-vars
    // const [fetchAudiences, isPostLoading, postError] = useFetching(
    //     async () => {
    //         const response = await PostService.getAll("numerator", "monday");
    //         //const response = await PostService.getAll(weekDayData.week, weekDayData.day);
    //         setAudiences(transformData(response.data))
    //         console.log(audiences)
    //     }
    // )
    //
    // useEffect(() => {
    //     fetchAudiences()
    //     console.log("FETCHING")
    // }, []);
    //
    const [levelOptions, setLevelOptions] = useState(levels);
    const [timeOptions, setTimeOptions] = useState(times.map(time => {
        const checkedTime = location.state.data.times.find(selTime => selTime === time.value);
        if (checkedTime) {
            return { ...time, checked: true };
        } else {
            return time;
        }
    }));

    const [weekOptions, setWeekOptions] = useState(weeks.map(week => {
        if (week.value === location.state.data.week) {
            week.checked = true;
        }
        return week;
    }));

    const [dayOptions, setDayOptions] = useState(days.map(day => {
        if (day.value === location.state.data.day[0]) {
            day.checked = true;
        }
        return day
    }))
    //
    //
    useEffect(() => {
        setLevelOptions(levelOptions);
    }, [levelOptions]);

    useEffect(() => {
        setWeekOptions(weekOptions);
        // fetch other week
    }, [weekOptions]);

    useEffect(() => {
        setTimeOptions(timeOptions);
    }, [timeOptions])

    useEffect(() => {
        setDayOptions(dayOptions)
        console.log(dayOptions)
    }, [dayOptions]);

    var selectedTimes = mergeAdjacentCheckedTimes(timeOptions);
    var selectedWeek = weekOptions.filter(option => option.checked).map(option =>  option.short);
    var selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.short);

    //
    // useEffect(() => {
    //     setSortedAudiences(filterAudiences(audiences, levelOptions, timeOptions))
    //     // eslint-disable-next-line
    // }, [audiences, levelOptions, timeOptions])
    //
    // var selectedLevels = levelOptions.filter(option => option.checked).map(option =>  parseInt(option.value));
    // var selectedTimes = timeOptions.filter(option => option.checked).map(option => option.value);
    //
    // const filterAudiences = (audiences, levelOptions, timeOptions) => {
    //     selectedLevels = levelOptions.filter(option => option.checked).map(option =>  parseInt(option.value));
    //     selectedTimes = timeOptions.filter(option => option.checked).map(option => option.value);
    //     return audiences.filter(audience => {
    //         return selectedLevels.includes(audience[0]) && selectedTimes.includes(audience[2]);
    //     });
    // };


    return (
        <div className="mylist-wrap">
            <h1 className="header-results">Результаты поиска</h1>
            <div className="dropdown-wrapper-list">
                <Mydropdown defaultValue={""}
                            multipleSelection={true}
                            hasImage={false}
                            buttonStyle={{padding: "11px", background: "#006cdc", width: "45px", height: "45px", borderRadius: "100px"}}
                            textWidth={"20px"}
                            dropdownStyle={{width: "45vw"}}
                            content="settings"
                            options={levelOptions} setOptions={setLevelOptions}
                />
                <Mydropdown defaultValue={selectedWeek.length ? selectedWeek : "День недели"}
                            multipleSelection={false}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"8vw"}
                            dropdownStyle={{width: "45vw"}}
                            options={weekOptions} setOptions={setWeekOptions}
                />
                <Mydropdown defaultValue={selectedDays.length ? selectedDays.join(", ") : "День недели"}
                            multipleSelection={false}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"18vw"}
                            dropdownStyle={{width: "45vw"}}
                            options={dayOptions} setOptions={setDayOptions}
                />
                <Mydropdown
                            hasImage={false}
                            multipleSelection={true}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px", width: "45vw"}}
                            textWidth={"45vw"}
                            dropdownStyle={{width: "45vw", right: 0}}
                            defaultValue={selectedTimes.length ? selectedTimes.join(", ") : "Время"}
                            options={timeOptions} setOptions={setTimeOptions}
                />
            </div>
            <AudiencesList items={audiences} floors={levelOptions}/>
            <Footer/>
        </div>
    );
}

export default List;