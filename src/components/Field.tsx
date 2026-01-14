import React from 'react';

interface FieldProps {
    type: string;
    name: string;
    placeholder: string;
    readonly?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ type, name, placeholder, readonly = false, value, onChange }) => {
    return (

        <input
            type={type}
            name={name}
            id={name}
            className="w-full p-2 border text-gray-600 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-babyblue-500"
            placeholder={placeholder}
            readOnly={readonly}
            value={value}
            onChange={onChange}
        />
    );
};

export default Field;
