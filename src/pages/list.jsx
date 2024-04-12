import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Footer from "../components/Footer/Footer";
import AudiencesList from "../components/audiencesList/audiencesList";
import {days, weeks, times, levels} from "../data/data"

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

function transformData(data) {
    const resultArray = [];
    data.forEach(item => {
        item.time.forEach(time => {
            const start = time.substr(0, 5);
            const timeArray = times.find(time => time.value === start);
            resultArray.push({floor: item.floor.toString(), number: item.name,time: `${timeArray.value} - ${timeArray.end}`});
        });
    });
    console.log("result", resultArray)
    return resultArray;
}

function List () {
    const location = useLocation();
    const [audiences, setAudiences] = useState([])
    //const [sortedAudiences, setSortedAudiences] = useState(audiences)
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


    const [fetchAudiences, isPostLoading, postError] = useFetching(
        async () => {
            const response = await PostService.getAll(
                weekOptions.find(week => week.checked === true).value,
                dayOptions.find(day => day.checked === true).value);
            setAudiences(transformData(response.data))
        }
    )

    useEffect(() => {
        fetchAudiences()
        console.log("FETCHING")
    }, [weekOptions, dayOptions]);

    useEffect(() => {
        setLevelOptions(levelOptions);
        console.log(audiences);
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
    }, [dayOptions]);

    useEffect(() => {
        setAudiences(audiences)
    }, [audiences]);

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