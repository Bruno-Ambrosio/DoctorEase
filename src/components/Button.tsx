import React from 'react';
import { IconType } from 'react-icons';

interface ButtonProps {
    text: string;
    name: string;
    icon?: IconType; 
    onClick: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, name, icon: Icon, onClick }) => {
    return (
        <button
            className="flex items-center justify-center text-white w-full bg-emerald-600 py-2 px-4 rounded-lg hover:bg-emerald-500 transition duration-300 gap-2"
            name={name}
            onClick={onClick}
        >
            {Icon && <Icon className="text-xl" />}
            <span className="text-sm font-medium">{text}</span>
        </button>
    );
};

export default Button;
