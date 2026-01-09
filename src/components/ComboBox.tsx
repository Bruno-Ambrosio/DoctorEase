import React from "react";
import { TextConstants } from "../constants/TextConstants";

export interface ComboBoxOption {
    value: number | string;
    label: string;
}

interface ComboBoxProps {
    name: string;
    value?: number | string;
    options: ComboBoxOption[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ComboBox: React.FC<ComboBoxProps> = ({
    name,
    value,
    options,
    onChange
}) => {
    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-babyblue-500"
        >
            <option value="0">{TextConstants.COMBOBOX_PLACEHOLDER}</option>

            {options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};

export default ComboBox;
