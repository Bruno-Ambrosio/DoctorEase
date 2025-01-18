import React from "react";

interface LinkProps {
    text: string;
}

const Link: React.FC<LinkProps> = ({ text }) => {
    return (
        <a className="hover:underline text-sm text-gray-500">
            {text}
        </a>
    );
};

export default Link;
