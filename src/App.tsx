import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <AuthProvider>
        <Router future={{
          v7_relativeSplatPath: true,
        }}>
          <Routes />
        </Router>
      </AuthProvider>
    </ToastProvider>
  );
};

export default App;
