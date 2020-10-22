export interface Quiz {
    id ?: string;
    owner: Owner;
    data: Data;
}
export interface Owner {
    name: string;
    quizTitle: string;
    email: string;
    subscribe?: boolean;
}
export interface Applicant {
    name: string;
    rollNumber: string;
    subscribe?: boolean;
}
export interface Data {
    questions: question[];
    quizDuration: number;
    quizStartTime: string;
    quizExpiryTime: string;
}
export interface question {
    question: string,
    choices:
        { choice: string, isCorrect: boolean }[] | 
        { choice: string, selected ?: boolean }[]
}