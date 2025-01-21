import React from 'react';

interface FieldProps {
    type: string;
    name: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Field: React.FC<FieldProps> = ({ type, name, placeholder, onChange }) => {
    return (

        <input
            type={type}
            name={name}
            id={name}
            className="w-full px-4 py-2 border text-gray-600 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder={placeholder}
            onChange={onChange}
        />
    );
};

export default Field;
