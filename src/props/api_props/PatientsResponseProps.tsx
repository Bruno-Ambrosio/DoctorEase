import { GenderProps } from "./GenderResponseProps";

export interface PatientProps {
    id: number,
    name: string,
    adress: string,
    gender: GenderProps
}

export interface PatientsResponseProps {
    message: string,
    success: boolean,
    content: PatientProps[],
}