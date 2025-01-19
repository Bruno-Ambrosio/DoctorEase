import React, { useState } from "react";
import SidebarButton from "./SidebarButton";
import Field from "./Field";

const Sidebar: React.FC = () => {
    const [activeButton, setActiveButton] = useState<string | null>(null);

    const handleButtonClick = (buttonName: string) => {
        setActiveButton(buttonName);
    };

    const sidebarButtons = {
        Dashboard: 'Dashboard',
        Patients: 'Patients',
        Reports: 'Reports'
    };

    return (
        <div className="h-screen w-64 bg-white-50 shadow-lg flex flex-col">
            {/* Título */}
            <div className="flex flex-col gap-4 p-2">
                <h3 className="text-3xl font-bold text-emerald-600 text-center mb-10">
                    Doctor Ease
                </h3>
                <Field type="search" name="Search" placeholder="Search..." onChange={() => { }} />
            </div>

            <div className="flex flex-col p-2">
                <SidebarButton name={sidebarButtons.Dashboard} text={sidebarButtons.Dashboard} active={activeButton == sidebarButtons.Dashboard} onClick={() => handleButtonClick(sidebarButtons.Dashboard)} />
                <SidebarButton name={sidebarButtons.Patients} text={sidebarButtons.Patients} active={activeButton == sidebarButtons.Patients} onClick={() => handleButtonClick(sidebarButtons.Patients)} />
                <SidebarButton name={sidebarButtons.Reports} text={sidebarButtons.Reports} active={activeButton == sidebarButtons.Reports} onClick={() => handleButtonClick(sidebarButtons.Reports)} />
            </div>
        </div>
    );
};

export default Sidebar;
