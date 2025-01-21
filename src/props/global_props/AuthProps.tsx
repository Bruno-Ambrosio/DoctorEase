import { UserProps } from './UserProps';

export interface AuthProps {
    token: string | null;
    saveToken: (newToken: string) => void;
    logout: () => void;
    isLoggedIn: boolean;
    isLoading: boolean;
    saveUser: (user: UserProps) => void;
    user: UserProps | null;
    getToken: () => string | null;
}