import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import Field from "./Field";
import { TextConstants } from "../constants/TextConstants";
import { useNavigate, useLocation } from "react-router-dom";
import { UrlConstants } from "../constants/UrlConstants";
import MenuIcon from '../assets/images/menu.png';
import ImageButton from "./ImageButton";
import PatientIcon from '../assets/images/patientIcon.png';
import DashboardIcon from '../assets/images/dashboard.png';
import ReportIcon from '../assets/images/report.png';

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => {
        return location.pathname.startsWith(path);
    };

    const handleButtonClick = (buttonName: string) => {
        navigate(buttonName);
    };
    
    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 768px)");

        const handleResize = () => {
            setCollapsed(mediaQuery.matches);
        };

        handleResize();
        mediaQuery.addEventListener("change", handleResize);

        return () => mediaQuery.removeEventListener("change", handleResize);
    }, []);
    return (
        <div
            className={`
                h-full bg-gray-50 flex flex-col justify-between p-2
                transition-all duration-300
                ${collapsed ? "w-20" : "w-72"}
            `}
        >
            <div className="flex flex-col gap-4">
                <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-2`}>
                    {!collapsed && (
                        <h1 className="text-2xl font-bold text-babyblue-500">
                            Doctor Ease
                        </h1>
                    )}
                    <ImageButton image={MenuIcon} imageCss="size-8" onClick={() => setCollapsed(!collapsed)} />
                </div>

                {!collapsed && (
                    <Field
                        type="search"
                        name={TextConstants.SIDEBAR_SEARCH}
                        placeholder={TextConstants.SIDEBAR_SEARCH}
                        onChange={() => { }}
                        value=""
                    />
                )}

                <div className={`flex flex-col ${collapsed ? "justify-center items-center" : ""}`}>
                    <SidebarButton
                        text={!collapsed ? TextConstants.SIDEBAR_DASHBOARD : ""}
                        active={isActive(UrlConstants.DASHBOARD_URL)}
                        onClick={() => handleButtonClick(UrlConstants.DASHBOARD_URL)}
                        image={DashboardIcon}
                    />

                    <SidebarButton
                        text={!collapsed ? TextConstants.SIDEBAR_PATIENTS : ""}
                        active={isActive(UrlConstants.PATIENTS_URL)}
                        onClick={() => handleButtonClick(UrlConstants.PATIENTS_URL)}
                        image={PatientIcon}
                    />

                    <SidebarButton
                        text={!collapsed ? TextConstants.SIDEBAR_REPORTS : ""}
                        active={isActive(UrlConstants.REPORTS_URL)}
                        onClick={() => handleButtonClick(UrlConstants.REPORTS_URL)}
                        image={ReportIcon}
                    />
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
