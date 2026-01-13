import React from "react";

interface ImageButtonProps {
    image: string;
    onClick: (value: React.MouseEvent) => void;
}

const ImageButton: React.FC<ImageButtonProps> = ({ image, onClick }) => {
    return (
        <button
            type="button"
            onClick={(e) => onClick(e)}
            className="text-2xl transition-transform duration-200 hover:scale-110"
        >
            <img src={image} alt="" />
        </button>
    );
};

export default ImageButton;
