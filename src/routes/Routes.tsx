import { Route, Routes as RoutesDom } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import Layout from '../pages/Layout';
import PatientsPage from '../pages/private/PatientsPage';
import RegisterPage from '../pages/public/RegisterPage';
import PublicRoute from './PublicRoute';

const Routes: React.FC = () => {
    return (
        <RoutesDom>
            <Route path="/" element={<PublicRoute children={<LoginPage />} />} />
            <Route path="/register" element={<PublicRoute children={<RegisterPage />} />} />
            <Route element={<ProtectedRoute children={<Layout />} />}>
                <Route path="/home" element={<PatientsPage />} />
            </Route>
        </RoutesDom>
    );
};

export default Routes;
