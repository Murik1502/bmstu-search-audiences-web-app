import React, { useState, useEffect, useRef } from "react";
import "./mydropdown.css";

const MyDropdown = ({ multipleSelection, content, defaultValue, options, setOptions, buttonStyle, hasImage, textWidth, dropdownStyle }) => {
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
        const updatedOptions = options.map(option => ({
            ...option,
            checked: !selectAllChecked
        }));
        setOptions(updatedOptions);
        setSelectAllChecked(!selectAllChecked);
    };

    const handleChange = (value) => {
        if (multipleSelection === true) {
            setOptions(prevOptions => {
                return prevOptions.map(option => {
                    if (option.value === value) {
                        return { ...option, checked: !option.checked };
                    }
                    return option;
                });
            });
        } else {
            setOptions(prevOptions => {
                return prevOptions.map(option => {
                    return { ...option, checked: option.value === value };
                });
            });
            setIsDropdownOpen(false);
        }
    };


    return (
        <div className="dropdown" id="dropdown" ref={dropdownRef}>
            <div onClick={toggleDropdown} className="dropdown-text" style={buttonStyle}>
                {content ?
                    <div className={"content-" + content} /> :
                    <div className={"dropdown-btn-text"} style={{ maxWidth: textWidth }}>{defaultValue}</div>
                }
                {hasImage && (
                    isDropdownOpen ? (
                        <div className={"select-arrow-normal"} />
                    ) : (
                        <div className={"select-arrow-flipped"} />
                    )
                )}
            </div>
            {isDropdownOpen && (
                <div className="dropdown-content" id={"dropdown-content" + defaultValue} style={dropdownStyle}>
                    {multipleSelection && <label className="option">
                        <input
                            type="checkbox"
                            id={`select-all-${defaultValue}`}
                            onClick={toggleSelectAll}
                            checked={selectAllChecked}
                        />
                        <label htmlFor={`select-all-${defaultValue}`}>Выбрать все</label>
                    </label>}
                    {options.map((option, index) => (
                        <label key={option.value} className={options.length - 1 === index? "option-last" : "option"}>
                            <input
                                type="checkbox"
                                id={`checkbox-${option.value}`}
                                value={option.label}
                                checked={option.checked}
                                onClick={() => handleChange(option.value)}
                            />
                            <p className={"option-text"}>{option.label}</p>
                            <p className="option-svg" style={{ display: option.checked ? 'block' : 'none' }} />
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyDropdown;
