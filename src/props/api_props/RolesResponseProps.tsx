import { UserProps } from "../global_props/UserProps";

export interface RoleProps {
    id: number,
    description: string
    users: UserProps[]
}

export interface RolesResponseProps {
    message: string,
    success: boolean,
    content: RoleProps[],
}