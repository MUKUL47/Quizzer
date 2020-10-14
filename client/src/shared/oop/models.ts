//questionDialog.tsx
export interface choice {
    c?: string;
    correct?: boolean;
    edit?: boolean;
    editedValue?: string;
}
export interface questionModel {
    question: String;
    choices: choice[]
}
export interface validateQuestion {
    question: boolean;
    choices: boolean;
    correctAnswer: boolean;
}
//
//QuestionDataContext
export interface QuestionDataContextValue {
    mcq?: { get: questionModel, set: Function }
}
//