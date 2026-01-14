import React from "react";

interface ImageButtonProps {
    image: string;
    imageCss: string;
    onClick: (value: React.MouseEvent) => void;
    label?: string
}

const ImageButton: React.FC<ImageButtonProps> = ({ image, onClick, label, imageCss }) => {
    return (
        <button
            type="button"
            onClick={(e) => onClick(e)}
            className="flex items-center gap-2 text-2xl transition-transform duration-200 hover:scale-110"
        >
            <img src={image} alt="" className={imageCss}/>
            {label && (
                <span className="text-lg text-gray-600">
                    {label}
                </span>
            )}
        </button>
    );
};

export default ImageButton;
