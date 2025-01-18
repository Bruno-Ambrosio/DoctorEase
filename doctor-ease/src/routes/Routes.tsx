import { Route, Routes as RoutesDom } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import HomePage from '../pages/private/HomePage';

const Routes: React.FC = () => {
    return (
        <RoutesDom>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/home"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            />
        </RoutesDom>
    );
};

export default Routes;
