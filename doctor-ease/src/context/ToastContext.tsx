import React, { createContext, ReactNode, useState } from 'react';
import Toast from '../components/Toast';
import { ToastContextProps } from '../props/global_props/ToastContextProps';
import { ToastType } from '../enums/ToastType';
import { ToastProps } from '../props/global_props/ToastProps';

interface ToastProviderProps {
    children: ReactNode;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastProps[]>([]);

    const addToast = (message: string, type?: ToastType, duration?: number) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type, duration }]);
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        message={toast.message}
                        type={toast.type}
                        duration={toast.duration}
                        onClose={() => removeToast(toast.id ?? 0)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider };