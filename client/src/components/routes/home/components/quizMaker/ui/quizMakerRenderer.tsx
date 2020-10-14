import React, { useState } from 'react';
import './quizMakerRenderer.scss'
import QuizForm from './quizForm/quizForm';
import QuestionLayout from './questionLayout/questionlayout';
import { HomeIcon } from '../../../../../../shared/material-ui-modules';
import { QuestionDataContext } from './questionLayout/questionContextService';
import { useHistory } from "react-router-dom";
export default function QuizMakerLayout() {
    const history = useHistory();
    const [toggleFormQuiz, setToggleFormQuiz] = useState({ type: 'questions' });
    const goToHome = (): void => {
        if (window.confirm('Are you sure, your changes will be lost.')) {
            history.push('/');
        }
    }
    const layout = (
        <div>
            <div className="quizMakerBg"></div>
            <div className="layout-header">
                <div className="home-btn" onClick={(e: any) => goToHome()}>
                    <HomeIcon />
                </div>
                <div className="title">Quiz Maker</div>
            </div>
            <div className="quiz-maker quiz-m-p-100">
                <div className="layout" hidden={toggleFormQuiz.type === 'questions' ? true : false}>
                    <QuizForm goToQuestion={(formData: any) => { setToggleFormQuiz({ type: 'questions' }) }} />
                </div>
                <div className="layout" hidden={toggleFormQuiz.type === 'form' ? true : false}>
                    <QuestionDataContext>
                        <QuestionLayout goToForm={(formData: any): void => setToggleFormQuiz({ type: 'form' })}
                        />
                    </QuestionDataContext>
                </div>
            </div>
        </div>
    )
    return layout;
}