import React from 'react';
import Button from './Button';
import PatientImg from '../assets/images/patient.jpg';
import { IconType } from 'react-icons';

interface ButtonCardProps {
    text: string;
    icon: IconType;
    onClick: () => void;
}

const ButtonCard: React.FC<ButtonCardProps> = ({ text, icon: Icon, onClick }) => {
    return (
        <div className="flex flex-col w-64 h-56 bg-gray-50 gap-2 rounded-lg p-2">
            <div className="w-full h-full">
                <img src={PatientImg} alt="" className="w-60 rounded-lg" />
            </div>
            <div className="">
                <Button name={text} text={text} icon={Icon} onClick={onClick} />
            </div>
        </div>
    );
};

export default ButtonCard;
