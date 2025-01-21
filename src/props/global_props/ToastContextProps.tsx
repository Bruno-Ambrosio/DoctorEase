import { ToastType } from "../../enums/ToastEnum";

export interface ToastContextProps {
    addToast: (message: string, type?: ToastType, duration?: number) => void;
}