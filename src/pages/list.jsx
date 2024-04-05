import React, {useEffect, useState} from 'react';
import {useTelegram} from "../hooks/useTelegram";
import {useLocation, useNavigate} from "react-router-dom";
import MyList from "../components/list/myList";
import Mydropdown from "../components/dropdown/mydropdown";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";

const levels = [
    { label: '1', value: '1', checked: false },
    { label: '2', value: '2', checked: false },
    { label: '4', value: '4', checked: false },
    { label: '5', value: '5', checked: false },
    { label: '6', value: '6', checked: false },
    { label: '7', value: '7', checked: false },
    { label: '8', value: '8', checked: false },
    { label: '9', value: '9', checked: false },
    { label: '11', value: '11', checked: false },
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
        tg.BackButton.offClick(onBackButtonClick);
        toggleBackButton();
        navigate('/');
    }

    if (!tg.BackButton.isVisible) {
        toggleBackButton();
        tg.BackButton.onClick(onBackButtonClick);
    }

    const weekDayData = location.state.data
    console.log("week day", weekDayData);

    const [audiences, setAudiences] = useState([])
    const [sortedAudiences, setSortedAudiences] = useState(audiences)

    // eslint-disable-next-line no-unused-vars
    const [fetchAudiences, isPostLoading, postError] = useFetching(
        async () => {
            const response = await PostService.getAll("numerator", "friday");
            setAudiences(transformData(response.data))
            console.log(audiences)
        }
    )
    useEffect(() => {
        fetchAudiences()
        console.log("FETCHING")
    }, [fetchAudiences]);


    const [originalLevelOrder, setOriginalLevelOrder] = useState(levels.map(option => option.value));
    const [levelOptions, setLevelOptions] = useState(levels);
    
    const [originalTimeOrder, setOriginalTimeOrder] = useState(levels.map(option => option.value));
    const [timeOptions, setTimeOptions] = useState(times);


    useEffect(() => {
        setLevelOptions(levelOptions);
        setOriginalLevelOrder(levelOptions.map(option => option.value));
    }, [levelOptions]);

    useEffect(() => {
        setTimeOptions(timeOptions);
        setOriginalTimeOrder(timeOptions.map(option => option.value));
    }, [timeOptions]);
    
    useEffect(() => {
        setSortedAudiences(filterAudiences(audiences, levelOptions, timeOptions))
    }, [audiences, levelOptions, timeOptions])

    const filterAudiences = (audiences, levelOptions, timeOptions) => {
        const selectedLevels = levelOptions.filter(option => option.checked).map(option =>  parseInt(option.value));
        const selectedTimes = timeOptions.filter(option => option.checked).map(option => option.value);
        return audiences.filter(audience => {
            return selectedLevels.includes(audience[0]) && selectedTimes.includes(audience[2]);
        });
    };

    return (
        <div>
            <div className="dropdown-wrapper">
                <Mydropdown defaultValue="Этаж" options={levelOptions} setOptions={setLevelOptions}
                            originalOrder={originalLevelOrder}/>
                <Mydropdown defaultValue="Время" options={timeOptions} setOptions={setTimeOptions}
                            originalOrder={originalTimeOrder}/>
            </div>
            <MyList items={sortedAudiences}/>
        </div>
    );
}

export default List;