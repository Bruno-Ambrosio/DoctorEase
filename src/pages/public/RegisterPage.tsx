import React, { useState } from 'react';
import Field from '../../components/Field';
import Button from '../../components/Button';
import Link from '../../components/Link';
import Label from '../../components/Label';
import useToast from '../../hooks/useToast';
import { LoginResponseProps } from '../../props/api_props/LoginResponseProps';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { TextConstants } from '../../constants/TextConstants';
import { ToastEnum } from '../../enums/ToastEnum';
import { InternalConstants } from '../../constants/InternalConstants';
import { RoleEnum } from '../../enums/RoleEnum';
import { UrlConstants } from '../../constants/UrlConstants';
import { verifyPassword } from '../../utils/Password';
import { MessageConstants } from '../../constants/MessageConstants';
import { isBlank, isValidEmail, isValidName } from '../../utils/Fields';

interface RegisterProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: RoleEnum;
}

const RegisterPage: React.FC = () => {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [user, setUser] = useState<RegisterProps>({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: RoleEnum.Default
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const validateUserFields = (user: RegisterProps): boolean => {
        return !isBlank(user.name) &&
            !isBlank(user.email) &&
            !isBlank(user.password) &&
            !isBlank(user.confirmPassword);
    };

    const validateConfirmPassword = (pass: string, confirmPass: string): boolean => {
        return pass === confirmPass;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!verifyPassword(user.password)) {
            addToast(MessageConstants.WEAK_PASSWORD, ToastEnum.Warning);
            return;
        }

        if (!validateUserFields(user)) {
            addToast(MessageConstants.BLANK_FIELDS, ToastEnum.Warning);
            return;
        }

        if (!validateConfirmPassword(user.password, user.confirmPassword)) {
            addToast(MessageConstants.INVALID_CONFIRM_PASSWORD, ToastEnum.Warning);
            return;
        }

        if (!isValidEmail(user.email)){
            addToast(MessageConstants.INVALID_EMAIL, ToastEnum.Warning);
            return;
        }

        if (!isValidName(user.name)){
            addToast(MessageConstants.INVALID_NAME, ToastEnum.Warning);
            return;
        }

        let res;
        try {
            res = await api.post<LoginResponseProps>("api/Auth/register", user);

            if (res.data.success) {
                addToast(res.data.message, ToastEnum.Success, InternalConstants.DEFAULT_MESSAGE_DURATION);
                navigate(UrlConstants.LOGIN_URL);
                return;
            }

            addToast(res.data.message, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
        } catch (err: unknown) {
            if (err instanceof Error) {
                addToast(err.message || TextConstants.API_RESPONSE_ERROR, ToastEnum.Error, InternalConstants.DEFAULT_MESSAGE_DURATION);
            }
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-emerald-50">
            <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-xl p-6">
                <h3 className="text-3xl font-bold text-emerald-600 text-center mb-6">
                    Register
                </h3>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <Label text={TextConstants.NAME_LABEL} />
                            <Field name="name" placeholder={TextConstants.NAME_PLACEHOLDER} type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label text={TextConstants.EMAIL_LABEL} />
                            <Field name="email" placeholder={TextConstants.EMAIL_PLACEHOLDER} type="email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label text={TextConstants.PASSWORD_LABEL} />
                            <Field name="password" placeholder={TextConstants.PASSWORD_PLACEHOLDER} type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label text={TextConstants.CONFIRM_PASSWORD_LABEL} />
                            <Field name="confirmPassword" placeholder={TextConstants.CONFIRM_PASSWORD_PLACEHOLDER} type="password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between gap-2">
                            <Button name="register" text={TextConstants.REGISTER_BUTTON} onClick={(e: React.FormEvent) => handleSubmit(e)} />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <Link text={TextConstants.ALREADY_HAVE_ACCOUNT} url={UrlConstants.LOGIN_URL} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
