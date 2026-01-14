import React from "react";
import Sidebar from "../components/Sidebar";
import Frame from "../components/Frame";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Layout: React.FC = () => {
    return (
        <div className="flex w-screen h-screen bg-gray-200">
            <div className="fixed top-0 left-0 w-full z-50">
                <Navbar />
            </div>
            <div className="flex w-full h-full pt-12">
                <div className="relative shadow-sm">
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
