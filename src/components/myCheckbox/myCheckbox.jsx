import React, {useEffect} from 'react';
import "./myCheckbox.css";

const MyCheckbox = ({weekDay, setWeekDay}) => {
    useEffect(() => {
        console.log(weekDay)
    }, [weekDay]);
    return (
            <div className="role_selector">
                <input type="radio" name="role" id="student" value="numerator" defaultChecked={true} onInput={(e) => setWeekDay({
                    ...weekDay, week: "numerator"
                })}/>
                <label htmlFor="student" className="student">Числитель</label>
                <input type="radio" name="role" id="teacher" value="denominator" onInput={(e) => setWeekDay({
                    ...weekDay, week: "denominator"
                })}/>
                <label htmlFor="teacher" className="teacher">Знаменатель</label>
            </div>
    );
};

export default MyCheckbox;