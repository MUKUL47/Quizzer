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

//quiz
export interface QuizInstructions {
    name: string;
    rollNumber: string | number;
}


//running quiz model
export interface runningQuizQuestions {
    question: string,
    choices: { choice: string, selected: boolean }[]
}
export interface RunningQuiz {
    totalQuestions: number;
    activeQuestion: number;
    skippedQuestions: number[];
    questions: runningQuizQuestions[];
}
export interface QuizContextModel {
    quizForm: {
        get: any,
        set: Function
    }
}