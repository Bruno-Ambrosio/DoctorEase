import React from "react";
import Field from "../components/Field";
import Button from "../components/Button";
import Link from "../components/Link";
import Label from "../components/Label";

const LoginPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen bg-emerald-50">
            <div className="w-full max-w-md bg-white-50 rounded-lg shadow-xl p-6">
                <h3 className="text-3xl font-bold text-emerald-600 text-center mb-6">
                    Doctor Ease
                </h3>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <Label text="Email" />
                        <Field name="email" placeholder="type your email here" type="email" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label text="Password" />
                        <Field name="password" placeholder="type your password here" type="password" />
                    </div>
                    <div className="flex justify-between gap-2">
                        <Button name="signup" text="Sign up" />
                        <Button name="login" text="Login" />
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <Link text="Forgot password?" />
                    <Link text="Sign up" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
