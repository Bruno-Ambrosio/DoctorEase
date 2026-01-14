import React from 'react';
import { IconType } from 'react-icons';
import { ButtonEnum } from '../enums/ButtonEnum';

interface ButtonProps {
    text: string;
    name: string;
    type?: ButtonEnum;
    icon?: IconType;
    image?: string;
    onClick: (e: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, name, icon: Icon, onClick, type = ButtonEnum.Gray, image }) => {

    let css;
    switch (type) {
        case ButtonEnum.Gray:
            css = "bg-gray-100 hover:bg-gray-200 text-gray-600 border border-gray-300";
            break;
        case ButtonEnum.Blue:
            css = "bg-babyblue-500 hover:bg-babyblue-600 text-white";
            break;
    }

    return (
        <button
            className={`flex items-center justify-center text-gray-600 w-full ${css} p-2 rounded-md transition duration-300 gap-2`}
            name={name}
            onClick={onClick}
        >
            {Icon && <Icon />}
            {image && <img src={image} alt="" className="h-6 w-6 object-contain" />}
            <span className="text-md">{text}</span>
        </button>
    );
};

export default Button;
