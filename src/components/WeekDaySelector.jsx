import React from 'react';
import MySelect from "./select/mySelect";
import Slider from "./slider/slider";

const WeekDaySelector = ({weekDay, setWeekDay}) => {
    return (
        <div className={"weekDaySelector"}>
            <Slider
            weekDay={weekDay}
            setWeekDay={setWeekDay}
            />
            <MySelect
                onChange={selectedDay => setWeekDay({...weekDay, day: selectedDay})}
                defaultValue='День недели'
                options={[
                    { value: 'monday', name: 'Понедельник' },
                    { value: 'tuesday', name: 'Вторник' },
                    { value: 'wednesday', name: 'Среда' },
                    { value: 'thursday', name: 'Четверг' },
                    { value: 'friday', name: 'Пятница' },
                    { value: 'saturday', name: 'Суббота' }
                ]}
            />
        </div>
    );
};

export default WeekDaySelector;