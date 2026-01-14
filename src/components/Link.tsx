import React from 'react';

interface LinkProps {
    text: string;
    url?: string;
}

const Link: React.FC<LinkProps> = ({ text, url }) => {
    return (
        <a className="hover:underline text-sm text-gray-600" href={url}>
            {text}
        </a>
    );
};

export default Link;
