import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import { ToastContextProps } from '../props/global_props/ToastContextProps';

const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

export default useToast;