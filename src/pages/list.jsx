import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import Mydropdown from "../components/dropdown/mydropdown";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import Footer from "../components/Footer/Footer";
import AudiencesList from "../components/audiencesList/audiencesList";
import {days, weeks, times, levels} from "../data/data"
import {mergeAdjacentCheckedTimes, mergeAudiencesTime} from "../data/functions";
import Loader from "../components/loader/loader";

function transformData(data) {
    const resultArray = [];
    data.forEach(item => {
        item.time.forEach(time => {
            const start = time.substr(0, 5);
            const timeArray = times.find(time => time.value === start);
            resultArray.push({floor: item.floor.toString(), number: item.name,time: `${timeArray.value} - ${timeArray.end}`});
        });
    });
    return resultArray;
}

function List () {
    const location = useLocation();
    const [audiences, setAudiences] = useState([])
    const [sortedAudiences, setSortedAudiences] = useState(audiences)
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
        return day;
    }))


    const [fetchAudiences, isPostLoading, postError] = useFetching(
        async () => {
            const response = await PostService.getAll(
                weekOptions.find(week => week.checked === true).value,
                dayOptions.find(day => day.checked === true).value);
            setAudiences(transformData(response.data));
        }
    )

    useEffect(() => {
        fetchAudiences()
        console.log("FETCHING DATA");
    }, [weekOptions, dayOptions]);

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
    }, [dayOptions]);

    useEffect(() => {
        setAudiences(audiences)
    }, [audiences]);

    var selectedTimes = mergeAdjacentCheckedTimes(timeOptions);
    var selectedWeek = weekOptions.filter(option => option.checked).map(option =>  option.short);
    var selectedDays = dayOptions.filter(option => option.checked).map(option =>  option.short);

    useEffect(() => {
        if (audiences.length !== 0) {
            setSortedAudiences(filterAudiences(audiences, timeOptions));
        } else {
            setSortedAudiences([]);
        }
    }, [audiences, timeOptions])

    const filterAudiences = (audiences, timeOptions) => {
        const selectedTimes = timeOptions.filter(option => option.checked).map(option => option.label);
        let filteredAudiences = audiences.filter(audience => {
            return selectedTimes.includes(audience.time)
        });
        console.log(filteredAudiences);
        return mergeAudiencesTime(filteredAudiences, times);
    };


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
                            closeOnClick={true}
                            multipleSelection={false}
                            hasImage={false}
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px"}}
                            textWidth={"8vw"}
                            dropdownStyle={{width: "45vw"}}
                            options={weekOptions} setOptions={setWeekOptions}
                />
                <Mydropdown defaultValue={selectedDays.length ? selectedDays.join(", ") : "День недели"}
                            closeOnClick={true}
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
                            buttonStyle={{padding: "13px 18px",  borderRadius: "100px", height: "45px", maxWidth: "45vw"}}
                            textWidth={"45vw"}
                            dropdownStyle={{width: "45vw", right: 0}}
                            defaultValue={selectedTimes.length ? selectedTimes.join(", ") : "Время"}
                            options={timeOptions} setOptions={setTimeOptions}
                />
            </div>
            {
                isPostLoading ? (
                    <div className="loader-wrap">
                        <Loader/>
                    </div>
                ) : (

                    <AudiencesList items={sortedAudiences} floors={levelOptions}/>
                )
            }
            <Footer/>
        </div>
    );
}

export default List;