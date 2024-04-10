import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Footer from "../components/Footer/Footer";
import AudiencesList from "../components/audiencesList/audiencesList";

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
    { label: '08:30', value: '08:30', checked: false },
    { label: '10:15', value: '10:15', checked: false },
    { label: '12:00', value: '12:00', checked: false },
    { label: '13:50', value: '13:50', checked: false },
    { label: '15:40', value: '15:40', checked: false },
    { label: '17:25', value: '17:25', checked: false },
    { label: '19:10', value: '19:10', checked: false },
];

// const week = [
//     { label: 'numerator', value: 'numerator', checked: false },
//     { label: 'denominator', value: 'denominator', checked: false },
// ]

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

    // const location = useLocation();
    // const navigate = useNavigate();
    //
    // const {toggleBackButton, tg} = useTelegram();
    //
    // const onBackButtonClick = () => {
    //     tg.BackButton.offClick(onBackButtonClick);
    //     toggleBackButton();
    //     navigate('/');
    // }
    //
    // if (!tg.BackButton.isVisible) {
    //     toggleBackButton();
    //     tg.BackButton.onClick(onBackButtonClick);
    // }
    //
    // //const weekDayData = location.state.data
    // //console.log("week day", weekDayData);
    //
    // const [audiences, setAudiences] = useState([])
    // const [sortedAudiences, setSortedAudiences] = useState(audiences)
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
    // const [weekOptions, setWeekOptions] = useState(week);
    const [timeOptions, setTimeOptions] = useState(times);
    //
    //
    useEffect(() => {
        setLevelOptions(levelOptions);
    }, [levelOptions]);

    // useEffect(() => {
    //     setWeekOptions(weekOptions);
    //     // fetch other week
    // }, [weekOptions]);

    useEffect(() => {
        setTimeOptions(timeOptions);
    }, [timeOptions]);
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
                            hasImage={false}
                            buttonStyle={{padding: "11px", background: "#006cdc", width: "45px", height: "45px", borderRadius: "100px"}}
                            textWidth={"20px"}
                            dropdownStyle={{width: "45vw"}}
                            content="settings"
                            options={levelOptions} setOptions={setLevelOptions}
                />
                <Mydropdown defaultValue={"Чс"}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"8vw"}
                            dropdownStyle={{width: "45vw"}}
                            options={null} setOptions={null}
                />
                <Mydropdown defaultValue={"Вт, Ср, Чт, Пт"}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"18vw"}
                            dropdownStyle={{width: "45vw", right: 0}}
                            options={null} setOptions={null}
                />
                <Mydropdown defaultValue={"8:30, 12:00, 13:50"}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"26vw"}
                            dropdownStyle={{width: "45vw", right: 0}}
                            options={timeOptions} setOptions={setTimeOptions}
                />
            </div>
            {/*<AudiencesList items={[*/}
            {/*    {floor: '6', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '6', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '6', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '7', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '7', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '7', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '7', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '7', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '8', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '8', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '8', number: "719л", time: "8:30 - 12:00"},*/}
            {/*    {floor: '9', number: "719л", time: "8:30 - 12:00"},*/}
            {/*]} floors={levelOptions}/>*/}
            <Footer/>
        </div>
    );
}

export default List;