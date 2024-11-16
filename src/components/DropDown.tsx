import { useEffect, useRef, useState } from "react";
import DownCaretSVG from "./DownCaretSVG";
import UpCaretSVG from "./UpCaretSVG";

export default function DropDown({ options, handleOption, Label, multiple = false }) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedOptions, setSelectedOptions] = useState(multiple ? [] : "");
    const dropdownRef = useRef(null);

    const closeDropdown = () => setIsOpen(false);
    const filterSearch = options.filter((option) =>
        option.toLowerCase().includes(search.toLowerCase())
    );

    const handleClickOption = (option) => {
        if (multiple) {
            const updatedSelection = selectedOptions.includes(option)
                ? selectedOptions.filter((o) => o !== option)
                : [...selectedOptions, option];
            setSelectedOptions(updatedSelection);
            handleOption(updatedSelection);
        } else {
            setSelectedOptions(option);
            handleOption(option);
            setIsOpen(false);
        }
    };

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            closeDropdown();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div className="w-[540px] space-y-4 " ref={dropdownRef}>

            <div className="text-center uppercase font-semibold text-[36px]">{Label}</div>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border rounded-md px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                role="button"
                aria-expanded={isOpen}
                aria-controls="dropdown-options"
            >
                <span className="truncate text-gray-700">
                    {multiple
                        ? selectedOptions.length > 0
                            ? selectedOptions.join(", ")
                            : "Select options"
                        : selectedOptions || "Select an option"}
                </span>
                {isOpen ? <UpCaretSVG /> : <DownCaretSVG />}
            </div>


            {isOpen && (
                <div
                    className="absolute bg-white border rounded-md shadow-lg mt-2 w-full max-w-[300px] z-50 overflow-hidden"
                    id="dropdown-options"
                    role="listbox"
                >

                    <div className="px-4 py-2">
                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>


                    <ul className="max-h-60 overflow-y-auto">
                        {filterSearch.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleClickOption(option)}
                                className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${multiple && selectedOptions.includes(option)
                                    ? "bg-blue-50 font-medium"
                                    : ""
                                    }`}
                                role="option"
                                aria-selected={
                                    multiple ? selectedOptions.includes(option) : selectedOptions === option
                                }
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
