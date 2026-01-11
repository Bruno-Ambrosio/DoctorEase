import { GenderProps } from "./GenderResponseProps";

export interface NewPatientResponseProps {
    message: string,
    success: boolean,
    content: {
        id: number,
        name: string,
        adress: string,
        gender: GenderProps
    },
}