import React from 'react';
import PatientImg from '../assets/images/patient.png';

interface CardProps {
    text: string;
    url: string;
    bgColor?: string;
}

const Card: React.FC<CardProps> = ({ text, url, bgColor }) => {
    return (
        <a className={`hover:bg-gray-100 flex flex-col w-60 h-56 ${bgColor ? bgColor : "bg-gray-50"} gap-2 rounded-lg p-2 cursor-pointer`} href={url} >
            <div className="flex items-center justify-center w-full h-full">
                <img src={PatientImg} alt="" className="w-40 rounded-lg" />
            </div>
            <div className="text-gray-500 text-center">
                <h3>{text}</h3>
            </div>
        </a >
    );
};

export default Card;
