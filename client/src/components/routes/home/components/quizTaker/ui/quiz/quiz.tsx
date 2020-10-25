import React, { useState, useEffect, useContext } from 'react';
import './quiz.scss'
import Header from './header/header';
import Question from './question/question';
import QuestionsTab from './questionsTab/questionsTab';
import QuestionsMobileTab from './questionsMobileTab/questionsMobileTab';
import Utils from '../../../../../../../shared/utils';
import { QuizContext } from './quizContextService';
export default function Quiz(props: any) {
    const { quizData, form, submitQuizOver } = props;
    document.title = 'Quiz - Good Luck :)';
    const quizContext: any = useContext(QuizContext)
    const [remainingTime, setRemainingTime] = useState((Number(quizData.quizDuration) * 60 as any));
    const [mobile, setMobile] = useState((window.innerWidth < 750 as boolean))
    useEffect(() => {
        if(quizContext.quizStatus.get){
            return;
        }
        const id = setTimeout(() => {
            if (remainingTime === 1) {
                clearTimeout(id);
                setRemainingTime('Time up!');
                submitQuizOver({ questions: quizContext.quizForm.get.f.questions, form: form }, false)
                quizContext.quizStatus.set(true)
                return;
            }
            setRemainingTime(remainingTime - 1);
        }, 1000);
        return (() => clearTimeout(id))
    }, [remainingTime]);

    useEffect(() => {
        window.addEventListener('resize', e => setMobile(window.innerWidth < 750))
        return (() => window.addEventListener('resize', e => setMobile(window.innerWidth < 750)))
    }, [])

    const submitQuiz = (): void => {
        if(quizContext.quizStatus.get){
            return;
        }
        submitQuizOver({ questions: quizContext.quizForm.get.f.questions, form: form }, true);
        quizContext.quizStatus.set(true)
    }
    return (
        <div className="quiz-layout">
            <div className="quiz-l-d">
                <div className="header-quiz">
                    <Header
                        remainingTime={Utils.formatSeconds(remainingTime)}
                        submitQuiz={submitQuiz}
                    />
                </div>
                {
                    quizContext.quizForm.get.f ?
                        <>
                            <div className="QuestionsMobileTab" style={{ display: 'none' }}>
                                {mobile ? <QuestionsMobileTab /> : null}
                            </div>
                            <div className="quiz_ques-quesTab">
                                <div className="quiz-ques">
                                    <Question />
                                </div>
                                <div className="quiz-quesTab">
                                    {!mobile ? <QuestionsTab /> : null}
                                </div>
                            </div>
                        </> : null
                }
            </div>
        </div>
    )
}