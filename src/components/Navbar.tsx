import React, { useState } from "react";
import UserIcon from '../assets/images/user.png';
import ImageButton from "./ImageButton";
import useAuth from "../hooks/useAuth";
import Dropdown from "./Dropdown";
import useToast from "../hooks/useToast";
import { useNavigate } from "react-router-dom";
import { UrlConstants } from "../constants/UrlConstants";
import { MessageConstants } from "../constants/MessageConstants";

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const { addToast } = useToast();
    const navigate = useNavigate();

    const handleLogoutClick = (e: React.FormEvent) => {
        e.preventDefault();
        logout();
        addToast(MessageConstants.SUCCES_LOGOUT);
        navigate(UrlConstants.LOGIN_URL);
    };
    return (
        <div className="h-12 w-full bg-gray-100 flex p-3 shadow-sm">
            <div className="flex w-full justify-between items-center">
                <div>

                </div>
                <Dropdown
                    trigger={
                        <div className="flex gap-2">
                            <ImageButton onClick={() => { }} image={UserIcon} label={user?.name} imageCss="size-8" />
                        </div>
                    }
                >
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-600">
                        Profile
                    </button>

                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-600">
                        Config
                    </button>

                    <div className="border-t" />

                    <button className="w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500" onClick={handleLogoutClick}>
                        Logout
                    </button>
                </Dropdown>
            </div>
        </div>
    );
};

export default Navbar;
