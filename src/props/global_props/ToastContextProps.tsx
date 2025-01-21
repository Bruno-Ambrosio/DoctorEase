import { ToastEnum } from "../../enums/ToastEnum";

export interface ToastContextProps {
    addToast: (message: string, type?: ToastEnum, duration?: number) => void;
}