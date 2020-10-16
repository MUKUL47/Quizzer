import { RunningQuiz, runningQuizQuestions } from '../../../../../../../shared/datamodels/models';
import RunningQuizData from '../../../../../../../shared/datamodels/runningQuiz';
import React, { useState, createContext, useEffect } from "react";
export const QuizContext = createContext(null);
export const QuizContextDataService = (props: any) => {
    const dummy: RunningQuiz =
    {
        activeQuestion: 1,
        questions: [{
            question: 'some question ...',
            choices: Array(4).fill(1).map((v, i) => {
                return {
                    choice: 'choice ' + i,
                    selected: false
                }
            })
        }],
        skippedQuestions: [],
        totalQuestions: 0
    }
    const [quizForm, setQuizForm] = useState({ f: new RunningQuizData(dummy.questions) })
    const setForm = (data: any): void => {
        setQuizForm({ f: data });
    }
    const value: any = {
        quizForm: {
            get: quizForm.f,
            set: setForm
        }
    }
    return (
        <QuizContext.Provider value={value}>
            {props.children}
        </QuizContext.Provider>
    )
}