import { ToastType } from "../../enums/ToastType";

export interface ToastContextProps {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}