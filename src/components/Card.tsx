import React from 'react';
import PatientImg from '../assets/images/patient.png';

interface CardProps {
    text: string;
    url: string;
    bgColor?: string;
}

const Card: React.FC<CardProps> = ({ text, url, bgColor }) => {
    return (
        <a className={`hover:bg-gray-100 flex flex-col w-52 h-40 ${bgColor ? bgColor : "bg-gray-50"} gap-2 rounded-md p-2 cursor-pointer`} href={url} >
            <div className="flex items-center justify-center w-full h-full">
                <img src={PatientImg} alt="" className='size-24' />
            </div>
            <div className="text-gray-600 text-center text-md">
                <span>{text}</span>
            </div>
        </a >
    );
};

export default Card;
