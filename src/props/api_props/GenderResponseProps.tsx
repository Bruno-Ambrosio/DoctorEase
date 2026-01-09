
export interface GenderProps {
    id: number;
    description: string;
}

export interface GenderResponseProps {
    message: string,
    success: boolean,
    content: GenderProps[],
}