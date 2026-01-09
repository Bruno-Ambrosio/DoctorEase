import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import Field from "./Field";
import { TextConstants } from "../constants/TextConstants";
import Button from "./Button";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { UrlConstants } from "../constants/UrlConstants";
import useToast from "../hooks/useToast";
import { MessageConstants } from "../constants/MessageConstants";

const Sidebar: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { addToast } = useToast();

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
        switch(buttonName){
            case UrlConstants.DASHBOARD_URL:
                navigate(UrlConstants.DASHBOARD_URL);
                break;
            case UrlConstants.PATIENTS_URL:
                navigate(UrlConstants.PATIENTS_URL);
                break;
            case UrlConstants.REPORTS_URL:
                navigate(UrlConstants.REPORTS_URL);
                break;
            default:
                navigate(UrlConstants.DASHBOARD_URL);
                break;
        }
        navigate(buttonName);
    };

    const sidebarButtons = {
        Dashboard: TextConstants.SIDEBAR_DASHBOARD,
        Patients: TextConstants.SIDEBAR_PATIENTS,
        Reports: TextConstants.SIDEBAR_REPORTS
    };

    const handleClick = (e: React.FormEvent) => {
        e.preventDefault();
        logout();
        addToast(MessageConstants.SUCCES_LOGOUT);
        navigate(UrlConstants.LOGIN_URL);
    };

    return (
        <div className="h-full w-72 bg-gray-50 flex flex-col justify-between p-2">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-12">
                    <h3 className="text-3xl font-bold text-babyblue-500 p-2 text-center">
                        Doctor Ease
                    </h3>
                    <Field type="search" name={TextConstants.SIDEBAR_SEARCH} placeholder={TextConstants.SIDEBAR_SEARCH} onChange={() => { }} />
                </div>

                <div className="flex flex-col">
                    <SidebarButton name={sidebarButtons.Dashboard} text={sidebarButtons.Dashboard} active={activeButton == sidebarButtons.Dashboard} onClick={() => handleButtonClick(sidebarButtons.Dashboard)} />
                    <SidebarButton name={sidebarButtons.Patients} text={sidebarButtons.Patients} active={activeButton == sidebarButtons.Patients} onClick={() => handleButtonClick(sidebarButtons.Patients)} />
                    <SidebarButton name={sidebarButtons.Reports} text={sidebarButtons.Reports} active={activeButton == sidebarButtons.Reports} onClick={() => handleButtonClick(sidebarButtons.Reports)} />
                </div>
            </div>
            <div>
                <Button name="logout" text={TextConstants.LOGOUT_BUTTON} onClick={(e: React.FormEvent) => handleClick(e)} />
            </div>
        </div>
    );
};

export default Sidebar;
