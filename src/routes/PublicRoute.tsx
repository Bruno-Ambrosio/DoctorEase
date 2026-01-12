import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { DefaultChildrenProps } from '../props/global_props/DefaultChildrenProps';

const PublicRoute: React.FC<DefaultChildrenProps> = ({ children }) => {
    const { isLoggedIn, isLoading } = useAuth();
    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Navigate to="/patients" /> : <>{children}</>;
};

export default PublicRoute;
