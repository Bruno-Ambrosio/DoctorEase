import React from 'react';
import { IconType } from 'react-icons';
import { ButtonEnum } from '../enums/ButtonEnum';

interface ButtonProps {
    text: string;
    name: string;
    type?: ButtonEnum;
    icon?: IconType;
    onClick: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, name, icon: Icon, onClick, type = ButtonEnum.Regular}) => {
    
    let color;
    let hover;
    switch (type) {
        case ButtonEnum.Inactive:
            color = "bg-gray-500";
            hover = "hover:bg-gray-600";
            break;
        case ButtonEnum.Edit:
            color = "bg-yellow-500";
            hover = "hover:bg-yellow-600";
            break;
        default:
            color = "bg-babyblue-500";
            hover = "hover:bg-babyblue-600";
            break;
    }

    return (
        <button
            className={`flex items-center justify-center text-white w-full ${color} ${hover} p-2 rounded-lg transition duration-300 gap-2`}
            name={name}
            onClick={onClick}
        >
            {Icon && <Icon />}
            <span className="text-lg font-bold">{text}</span>
        </button>
    );
};

export default Button;
