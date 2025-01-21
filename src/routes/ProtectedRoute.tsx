import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { ReactNode } from 'react';

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
