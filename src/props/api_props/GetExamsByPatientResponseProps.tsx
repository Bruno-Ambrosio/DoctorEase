export interface GetExamsByPatientProps {
    id: number,
    title: string
}

export interface GetExamsByPatientResponseProps {
    message: string,
    success: boolean,
    content: GetExamsByPatientProps[],
}