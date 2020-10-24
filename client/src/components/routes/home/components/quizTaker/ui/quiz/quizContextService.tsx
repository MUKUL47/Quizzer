import { RunningQuiz, runningQuizQuestions } from '../../../../../../../shared/datamodels/models';
import RunningQuizData from '../../../../../../../shared/datamodels/runningQuiz';
import React, { useState, createContext, useEffect } from "react";
export const QuizContext = createContext(null);
export const QuizContextDataService = (props: any) => {
    const qq = Array(100).fill(4).map((v, j) => {
        return {
            question: 'some question ...' + j,
            choices: Array(4).fill(1).map((v, i) => {
                return {
                    choice: 'choice ' + i + "-" + j,
                    selected: false
                }
            })
        }
    })
    const dummy: RunningQuiz =
    {
        activeQuestion: 1,
        questions: qq,
        flaggedQuestion: [],
        totalQuestions: 0
    }
    const formLoading: any = { f: null }
    const [quizForm, setQuizForm] = useState(formLoading);
    const [questionTab, setQuestionTab] = useState(true);
    useEffect(() => { setQuizForm({ f: new RunningQuizData(dummy.questions) }) }, [])
    const value: any = {
        quizForm: {
            get: quizForm,
            set: setQuizForm
        },
        questionTab: {
            get: questionTab,
            set: setQuestionTab
        }
    }
    return (
        <QuizContext.Provider value={value}>
            {props.children}
        </QuizContext.Provider>
    )
}