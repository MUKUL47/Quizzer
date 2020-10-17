import React, { useState, useEffect, useContext } from 'react';
import './quiz.scss'
import Header from './header/header';
import Question from './question/question';
import QuestionsTab from './questionsTab/questionsTab';
import Utils from '../../../../../../../shared/utils';
import RunningQuizData from '../../../../../../../shared/datamodels/runningQuiz';
import { RunningQuiz, runningQuizQuestions, QuizContextModel } from '../../../../../../../shared/datamodels/models';
import { QuizContext } from './quizContextService';
export default function Quiz() {
    document.title = 'Quiz - Good Luck :)';
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
        flaggedQuestion: [],
        totalQuestions: 0
    }
    const quizContext: any = useContext(QuizContext)
    const [remainingTime, setRemainingTime] = useState(3610);
    const [remainingTimeId, setRemainingTimeId] = useState(-1);
    useEffect(() => {
        const id = setTimeout(() => setRemainingTime(remainingTime - 1), 1000);
        return () => {
            if (remainingTimeId) {
                clearTimeout(remainingTimeId)
            }
        }
    }, [remainingTime])
    const submitQuiz = (): void => {
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
                        <div className="quiz_ques-quesTab">
                            <div className="quiz-ques">
                                <Question />
                            </div>
                            <div className="quiz-quesTab">
                                <QuestionsTab />
                            </div>
                        </div> : null
                }
            </div>
        </div>
    )
}