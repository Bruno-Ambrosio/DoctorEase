import React from 'react';

interface SidebarButtonProps {
    text: string;
    name: string;
    active: boolean;
    onClick: (e: React.FormEvent) => void;
}

const SidebarButton: React.FC<SidebarButtonProps> = ({ text, name, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            name={name}
            className={`py-2 px-4 text-left transition duration-300 h-14 ${active
                ? "border-b-2 border-babyblue-500 text-babyblue-500"
                : "bg-white-50 hover:bg-white-50 text-gray-500 border-b border-gray-200"
                }`}
        >
            {text}
        </button>
    );
};

export default SidebarButton;
