import { useEffect } from 'react';
import { ToastType } from '../enums/ToastType';
import { ToastProps } from '../props/global_props/ToastProps';

const Toast: React.FC<ToastProps> = ({ message, type = ToastType.Info, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeStyles = {
        [ToastType.Success]: "border-green-500 text-green-700",
        [ToastType.Error]: "border-red-500 text-red-700",
        [ToastType.Info]: "border-blue-500 text-blue-700",
        [ToastType.Warning]: "border-yellow-500 text-yellow-700",
    };

    return (
        <div>
            <div className={`${typeStyles[type]} bg-white-50 border-l-4 p-4 rounded-lg`}>
                <p className="text-lg font-semibold">Message</p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Toast;
