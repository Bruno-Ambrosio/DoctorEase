import React from 'react';

interface SidebarButtonProps {
    text: string;
    active: boolean;
    onClick: (e: React.FormEvent) => void;
    image?: string;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ text, active, onClick, image }) => {
    return (
        <button
            onClick={onClick}
            className={`py-2 px-4 text-left transition duration-300 h-14 ${active
                ? "border-b-2 border-babyblue-500 text-babyblue-500"
                : "bg-white-50 hover:bg-white-50 text-gray-600 border-b border-gray-200"
                }`}
        >
            <div className="flex gap-3 items-center">
                {image && (
                    <img src={image} alt="" className='size-5' />
                )}
                {text}
            </div>
        </button>
    );
};

export default SidebarButton;
