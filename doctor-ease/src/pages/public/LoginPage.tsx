import React, { useState } from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Label from '../../components/Label';
import useToast from '../../hooks/useToast';
import { LoginResponseProps } from '../../props/api_props/LoginResponseProps';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { TextConstants } from '../../constants/TextConstants';
import { ToastType } from '../../enums/ToastType';
import { InternalConstants } from '../../constants/InternalConstants';

interface LoginProps {
    email: string,
    password: string
}

const LoginPage: React.FC = () => {
    const { addToast } = useToast();
    const { saveToken, saveUser } = useAuth();
    const navigate = useNavigate();
    const [user, setUser] = useState<LoginProps>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let res;
        try {
            res = await api.post<LoginResponseProps>("api/Auth/login", user);

            if (res.data.success) {
                saveToken(res.data.content.token);
                saveUser(res.data.content.user);
                navigate("/home");
                addToast(res.data.message, ToastType.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                return;
            }

            addToast(res.data.message, ToastType.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastType.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-emerald-50">
            <div className="w-full max-w-md bg-white-50 rounded-lg shadow-xl p-6">
                <h3 className="text-3xl font-bold text-emerald-600 text-center mb-6">
                    Doctor Ease
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label text={TextConstants.EMAIL_LABEL} />
                        <Field name="email" placeholder={TextConstants.EMAIL_PLACEHOLDER} type="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label text={TextConstants.PASSWORD_LABEL} />
                        <Field name="password" placeholder={TextConstants.PASSWORD_PLACEHOLDER} type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                    </div>
                    <div className="flex justify-between gap-2">
                        <Button name="signup" text={TextConstants.SIGNUP_BUTTON} onClick={() => { }} />
                        <Button name="login" text={TextConstants.LOGIN_BUTTON} onClick={(e: React.FormEvent) => handleSubmit(e)} />
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <Link text={TextConstants.FORGOT_PASSWORD_LINK} />
                    <Link text={TextConstants.SIGNUP_LINK} />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
