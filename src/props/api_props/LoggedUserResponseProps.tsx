import { UserProps } from "../global_props/UserProps";

export interface LoggedUserResponseProps {
    message: string,
    success: boolean,
    content: UserProps,
}