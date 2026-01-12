import { Route, Routes as RoutesDom } from 'react-router-dom';
import LoginPage from '../pages/public/LoginPage';
import ProtectedRoute from '../routes/ProtectedRoute';
import Layout from '../pages/Layout';
import PatientsPage from '../pages/private/PatientsPage';
import RegisterPage from '../pages/public/RegisterPage';
import PublicRoute from './PublicRoute';
import DashboardPage from '../pages/private/DashboardPage';
import ReportsPage from '../pages/private/ReportsPage';
import NewPatient from '../pages/private/NewPatient';
import PatientPage from '../pages/private/PatientPage';

const Routes: React.FC = () => {
    return (
        <RoutesDom>
            <Route path="/" element={<PublicRoute children={<LoginPage />} />} />
            <Route path="/register" element={<PublicRoute children={<RegisterPage />} />} />
            <Route element={<ProtectedRoute children={<Layout />} />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/newPatient" element={<NewPatient />} />
                <Route path="/newPatient/:id" element={<NewPatient />} />
                <Route path="/patients/:id" element={<PatientPage />} />
            </Route>
        </RoutesDom>
    );
};

export default Routes;
