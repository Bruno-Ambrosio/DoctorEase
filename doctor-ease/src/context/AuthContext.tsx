import { createContext, useEffect, useState, ReactNode } from 'react';
import { AUTH_TOKEN_NAME } from '../constants.ts';
import { UserProps } from '../global_props/UserProps.tsx';
import { AuthProps } from '../global_props/AuthProps.tsx';
import { getCookie, setCookie, removeCookie } from '../utils/Cookies.tsx';

const AuthContext = createContext<AuthProps | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProps | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const storedToken: string | null = localStorage.getItem(AUTH_TOKEN_NAME);
        if (storedToken) {
            setToken(storedToken);
        }
        setIsLoading(false);
    }, []);

    const saveUser = (newUser: UserProps) => {
        setUser(newUser);
    };

    const saveToken = (newToken: string) => {
        setCookie(AUTH_TOKEN_NAME, newToken);
        setToken(newToken);
    };

    const clearToken = () => {
        removeCookie(AUTH_TOKEN_NAME);
        setToken(null);
        setUser(null);
    };

    const getToken = () => {
        return getCookie(AUTH_TOKEN_NAME);
    };

    const isLoggedIn = !!token;

    return (
        <AuthContext.Provider
            value={{ token, saveToken, clearToken, isLoggedIn, isLoading, saveUser, user, getToken }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
