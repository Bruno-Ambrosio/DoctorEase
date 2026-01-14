import React from 'react';

interface LabelProps {
    text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
    return (
        <label
            className="text-md text-gray-600"
        >
            {text}
        </label>
    );
};

export default Label;
