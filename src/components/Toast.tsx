import { useEffect } from 'react';
import { ToastEnum } from '../enums/ToastEnum';
import { ToastProps } from '../props/global_props/ToastProps';
import { TextConstants } from '../constants/TextConstants';

const Toast: React.FC<ToastProps> = ({ message, type = ToastEnum.Info, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const typeStyles = {
        [ToastEnum.Success]: "border-green-500 text-green-700",
        [ToastEnum.Error]: "border-red-500 text-red-700",
        [ToastEnum.Info]: "border-blue-500 text-blue-700",
        [ToastEnum.Warning]: "border-yellow-500 text-yellow-700",
    };

    return (
        <div>
            <div className={`${typeStyles[type]} bg-gray-50 border-l-4 p-4 rounded-lg`}>
                <p className="text-lg font-semibold">
                    {type == ToastEnum.Success ? TextConstants.SUCCESS_MESSAGE_TITLE :
                        type == ToastEnum.Info ? TextConstants.INFO_MESSAGE_TITLE :
                            type == ToastEnum.Warning ? TextConstants.WARNING_MESSAGE_TITLE :
                                type == ToastEnum.Error ? TextConstants.ERROR_MESSAGE_TITLE : ''
                    }
                </p>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Toast;
