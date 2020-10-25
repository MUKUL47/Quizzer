import RunningQuizData from '../../../../../../../shared/datamodels/runningQuiz';
import React, { useState, createContext, useEffect } from "react";
export const QuizContext = createContext(null);
export const QuizContextDataService = (props: any) => {
    const { quizData } = props;
    const formLoading: any = { f: null }
    const [quizForm, setQuizForm] = useState(formLoading);
    const [questionTab, setQuestionTab] = useState(true);
    const [quizStatus, setQuizStatus] = useState(false);
    useEffect(() => { setQuizForm({ f: new RunningQuizData(quizData.questions) }) }, [])
    const value: any = {
        quizForm: {
            get: quizForm,
            set: setQuizForm
        },
        questionTab: {
            get: questionTab,
            set: setQuestionTab
        },
        quizStatus : {
            get : quizStatus,
            set : setQuizStatus
        }
    }
    return (
        <QuizContext.Provider value={value}>
            {props.children}
        </QuizContext.Provider>
    )
}