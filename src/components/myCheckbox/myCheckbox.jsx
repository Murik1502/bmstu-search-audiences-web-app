import "./myCheckbox.css";

const MyCheckbox = ({weekDay, setWeekDay}) => {
    return (
            <div className="day_selector">
                <input type="radio" name="role" id="numerator" value="numerator" defaultChecked={true} onInput={(e) => setWeekDay({
                    ...weekDay, week: "numerator"
                })}/>
                <label htmlFor="numerator" className="numerator">Числитель</label>
                <input type="radio" name="role" id="denominator" value="denominator" onInput={(e) => setWeekDay({
                    ...weekDay, week: "denominator"
                })}/>
                <label htmlFor="denominator" className="denominator">Знаменатель</label>
            </div>
    );
};

export default MyCheckbox;