import { useEffect } from 'react';

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info" | "warning";
    duration?: number;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = "info", duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeStyles = {
        success: "bg-green-500 text-white",
        error: "bg-red-500 text-white",
        info: "bg-blue-500 text-white",
        warning: "bg-yellow-500 text-black",
    };

    return (
        <div
            className={`fixed top-4 right-4 z-50 rounded-lg px-4 py-2 shadow-lg transition-opacity duration-300 ${typeStyles[type]}`}
        >
            {message}
        </div>
    );
};

export default Toast;
