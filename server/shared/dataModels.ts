export interface Quiz {
    id: string;
    owner: Owner;
    data: data;
}
interface Owner {
    name: string;
    quizTitle: string;
    email: string;
    subscribe?: boolean;
}
interface Applicant {
    name: string;
    rollNumber: string;
    subscribe?: boolean;
}
interface data {
    questions: question[];
    quizDuration: number;
    quizStartTime: string;
    quizExpiryTime: string;
}
interface question {
    question: string,
    choices: { choice: string, selected: boolean }[]
}