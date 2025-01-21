import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { AuthProps } from '../props/global_props/AuthProps';

const useAuth = (): AuthProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};

export default useAuth;
