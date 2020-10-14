//questionDialog.tsx
export interface choice {
    c?: string;
    correct?: boolean;
    edit?: boolean;
    editedValue?: string;
}
export interface questionModel {
    question: string;
    choices: choice[];
    id?: any;
}
export interface validateQuestion {
    question: boolean;
    choices: boolean;
    correctAnswer: boolean;
}
//
//QuestionDataContext
export interface QuestionDataContextValue {
    mcq?: {
        get: questionModel,
        set: Function,
        delete: Function,
        update: Function
    };
    question?: {
        get: questionModel,
        reloadQuestion: Function
    }
}
//