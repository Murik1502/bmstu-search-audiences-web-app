import React, {useState, useEffect, useRef} from "react";
import "./mydropdown.css";

const MyDropdown = ({ defaultValue, options, setOptions, originalOrder}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    const toggleSelectAll = () => {
        const updatedOptions = options.map(option => ({
            ...option,
            checked: !selectAllChecked
        }));
        setOptions(updatedOptions);
        setSelectAllChecked(!selectAllChecked);
    };

    const handleChange = (value, checked) => {
        const updatedOptions = options.map(option => {
            if (option.value === value) {
                return { ...option, checked };
            }
            return option;
        });
        setOptions(updatedOptions);

        const selectedOptions = updatedOptions.filter(option => option.checked);
        const nonSelectedOptions = updatedOptions.filter(option => !option.checked);

        const selectedOrder = originalOrder.filter(value => selectedOptions.some(option => option.value === value));
        //const nonSelectedOrder = originalOrder.filter(value => selectedOptions.some(option => option.value === value));

        setOptions([...selectedOptions.sort((a, b) => selectedOrder.indexOf(a.value) - selectedOrder.indexOf(b.value)), ...nonSelectedOptions]);
    };


    return (
        <div className="dropdown" id="dropdown" ref={dropdownRef}>
            <div onClick={toggleDropdown} className="dropdown-text">
                <span>{defaultValue}</span>
                <span>{isDropdownOpen ? '▼' : '▲'}</span>
            </div>
            {isDropdownOpen && (
                <div className="dropdown-content" id="dropdown-content">
                    {options.map((option, index) => (
                        <React.Fragment key={option.label}>
                            {index > 0 && options[index - 1].checked !== option.checked && <hr/>}
                            <label className="option" htmlFor={`checkbox-${option.value}`}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${option.value}`}
                                    value={option.label}
                                    checked={option.checked}
                                    onChange={() => handleChange(option.value, !option.checked)}
                                />
                                <p className="option-text">{option.label}</p>
                            </label>
                        </React.Fragment>
                    ))}
                    <div>
                        <input
                            type="checkbox"
                            id={`select-all-${defaultValue}`}
                            onClick={toggleSelectAll}
                            checked={selectAllChecked}
                        />
                        <label htmlFor={`select-all-${defaultValue}`}>Выбрать все</label>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyDropdown;
