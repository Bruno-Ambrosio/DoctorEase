import React from "react";

interface FieldProps {
    type: string;
    name: string;
    placeholder: string;
}

const Field: React.FC<FieldProps> = ({ type, name, placeholder }) => {
    return (

        <input
            type={type}
            name={name}
            id={name}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={placeholder}
        />
    );
};

export default Field;
