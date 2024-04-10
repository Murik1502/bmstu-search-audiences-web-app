import React, {useState, useEffect, useRef} from "react";
import "./mydropdown.css";

const MyDropdown = ({content, defaultValue, options, setOptions, buttonStyle, hasImage, textWidth, dropdownWidth}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectAllChecked, setSelectAllChecked] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleSelectAll = () => {
        const updatedOptions = options.map((option, index) => {
            const optionSvg = document.getElementById(`option-svg-${option.label}`);
            if (optionSvg) {
                optionSvg.style.display = !selectAllChecked ? 'block' : 'none';
            }

            return {
                ...option,
                checked: !selectAllChecked
            };
        });

        setOptions(updatedOptions);
        setSelectAllChecked(!selectAllChecked);
    };

    const handleChange = (value, index) => {
        const updatedOptions = options.map((option, idx) => {
            if (option.value === value || idx === index) {
                return { ...option, checked: !option.checked };
            }
            return option;
        });
        setOptions(updatedOptions);
    };

    return (
        <div className="dropdown" id="dropdown" ref={dropdownRef}>
            <div onClick={toggleDropdown} className="dropdown-text" style={buttonStyle}>
                { content
                    ?
                    <div className={"content-"+content}/>
                    :
                    <div className={"dropdown-btn-text"} style={{maxWidth: textWidth}}>{defaultValue}</div>
                }
                {hasImage && (
                    isDropdownOpen ? (
                        <div className={"select-arrow-normal"}/>
                    ) : (
                        <div className={"select-arrow-flipped"}/>
                    )
                )}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-content" id={"dropdown-content"+defaultValue} style={{width: dropdownWidth}}>
                    <label className="option">
                        <input
                            type="checkbox"
                            id={`select-all-${defaultValue}`}
                            onClick={toggleSelectAll}
                            checked={selectAllChecked}
                        />
                        <label htmlFor={`select-all-${defaultValue}`}>Выбрать все</label>
                    </label>
                    {options.map((option, index) => (
                        <React.Fragment key={option.value}>
                            <label className={"option"+(options.length - 1 === index ? "-last": "")} htmlFor={`checkbox-${option.value}`}>
                                <input
                                    type="checkbox"
                                    id={`checkbox-${option.value}`}
                                    value={option.label}
                                    checked={option.checked}
                                    onChange={() => handleChange(option.value, index)}
                                />
                                <p className={"option-text"}>{option.label}</p>
                                <p className="option-svg" id={"option-svg-" + option.label}
                                   style={{display: option.checked ? 'block' : 'none'}}/>
                            </label>
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDropdown;
