import { UserProps } from "../global_props/UserProps";

export interface LoginResponseProps {
    message: string,
    success: boolean,
    content: {
        token: string,
        user: UserProps
    },
}