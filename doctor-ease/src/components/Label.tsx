import React from "react";

interface LabelProps {
    text: string;
}

const Label: React.FC<LabelProps> = ({ text }) => {
    return (
        <label
            className="text-sm font-medium text-gray-500"
        >
            {text}
        </label>
    );
};

export default Label;
