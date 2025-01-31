import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { DefaultChildrenProps } from '../props/global_props/DefaultChildrenProps';

const ProtectedRoute: React.FC<DefaultChildrenProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <>{children}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
