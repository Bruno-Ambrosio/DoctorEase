import { ToastType } from "../../enums/ToastType";

export interface ToastProps {
    id?: number;
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
}