import { PatientProps } from "./PatientsResponseProps";

export interface PatientResponseProps {
    message: string,
    success: boolean,
    content: PatientProps,
}