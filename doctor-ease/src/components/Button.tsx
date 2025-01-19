import React from 'react';

interface ButtonProps {
    text: string;
    name: string;
    onClick: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, name, onClick }) => {
    return (
        <button
            className="text-white-50 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-500"
            name={name}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
