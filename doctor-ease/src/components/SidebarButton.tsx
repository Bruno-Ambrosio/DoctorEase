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
            className={`py-2 px-4 text-left rounded-lg transition duration-300 ${active
                ? "border-2 border-emerald-300 text-emerald-600"
                : "bg-white-50 hover:bg-white-50 text-gray-500"
                }`}
        >
            {text}
        </button>
    );
};

export default SidebarButton;
