import { createContext, useEffect, useState } from 'react';
import { InternalConstants } from '../constants/InternalConstants.ts';
import { UserProps } from '../props/global_props/UserProps.tsx';
import { AuthProps } from '../props/global_props/AuthProps.tsx';
import { getCookie, setCookie, removeCookie } from '../utils/Cookies.tsx';
import { DefaultChildrenProps } from '../props/global_props/DefaultChildrenProps.tsx';
import { LoggedUserResponseProps } from '../props/api_props/LoggedUserResponseProps.tsx';
import Api from '../services/api.tsx';

const AuthContext = createContext<AuthProps | undefined>(undefined);

const AuthProvider: React.FC<DefaultChildrenProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken = getToken();

        if (!storedToken) {
            setIsLoading(false);
            return;
        }

        setToken(storedToken);
        loadUser();
        setIsLoading(false);
    }, []);

    const loadUser = async () => {
        try {
            const res = await Api.get<LoggedUserResponseProps>("api/auth/me");
            setUser(res.data.content);
        } catch {
            logout();
        }
    }

    const saveUser = (newUser: UserProps) => {
        setUser(newUser);
    };

    const saveToken = (newToken: string) => {
        setCookie(InternalConstants.AUTH_TOKEN_NAME, newToken);
        setToken(newToken);
    };

    const logout = () => {
        removeCookie(InternalConstants.AUTH_TOKEN_NAME);
        setToken(null);
        setUser(null);
    };

    const getToken = () => {
        return getCookie(InternalConstants.AUTH_TOKEN_NAME);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider
            value={{ token, saveToken, logout, isLoggedIn, isLoading, saveUser, user, getToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
