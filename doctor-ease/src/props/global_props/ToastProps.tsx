import { ToastEnum } from "../../enums/ToastEnum";

export interface ToastProps {
    id?: number;
    message: string;
    type?: ToastEnum;
    duration?: number;
    onClose?: () => void;
}