import React, { ReactNode } from "react";

const Frame: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div className="w-full h-full bg-white-50 flex flex-col">
            {children}
        </div>
    );
};

export default Frame;
