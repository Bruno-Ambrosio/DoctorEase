import React from "react";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
    return (
        <div className="flex w-screen h-screen bg-emerald-50">
            <div className="flex w-full h-full">
                <div className="flex h-full relative shadow-lg">
                    <Sidebar />
                </div>
                <div className="flex w-full h-full">
                    <Frame>
                        <Outlet />
                    </Frame>
                </div>
            </div>
        </div>
    );
};

export default Layout;
