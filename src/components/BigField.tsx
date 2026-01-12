import React from 'react';

interface BigFieldProps {
    name: string;
    placeholder: string;
    readonly?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur: (e: React.FocusEvent) => void;
}

const BigField: React.FC<BigFieldProps> = ({ name, placeholder, readonly = false, value, onChange, onBlur }) => {
    return (

        <textarea
            name={name}
            id={name}
            className="resize-none w-full px-4 py-2 border text-gray-500 text-xl border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-babyblue-500"
            placeholder={placeholder}
            readOnly={readonly}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    );
};

export default BigField;
