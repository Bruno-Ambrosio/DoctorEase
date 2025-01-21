import React from "react";
import { DefaultChildrenProps } from "../props/global_props/DefaultChildrenProps";

const Frame: React.FC<DefaultChildrenProps> = ({ children }) => {

    return (
        <div className="w-full h-full bg-white-50 flex flex-col">
            {children}
        </div>
    );
};

export default Frame;
