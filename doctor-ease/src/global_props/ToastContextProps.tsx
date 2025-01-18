export interface ToastContextProps {
    addToast: (message: string, type?: "success" | "error" | "info" | "warning", duration?: number) => void;
}