import React, { useState } from 'react';
import './quizMakerRenderer.scss'
import QuizForm from './quizForm/quizForm';
import QuestionLayout from './questionLayout/questionlayout';
import { HomeIcon } from '../../../../../../shared/material-ui-modules';
export default function QuizMakerLayout() {
    const [quizForm, setQuizForm] = useState(null)
    const [toggleFormQuiz, setToggleFormQuiz] = useState({ type: 'questions' })
    const layout = (
        <div>
            <div className="quizMakerBg"></div>
            <div className="layout-header">
                <div className="home-btn">
                    <HomeIcon />
                </div>
                <div className="title">Quiz Maker</div>
            </div>
            <div className="quiz-maker quiz-m-p-100">
                <div className="layout" hidden={toggleFormQuiz.type === 'questions' ? true : false}>
                    <QuizForm goToQuestion={(formData: any) => { setQuizForm(formData); setToggleFormQuiz({ type: 'questions' }) }} />
                </div>
                <div className="layout" hidden={toggleFormQuiz.type === 'form' ? true : false}>
                    <QuestionLayout goToForm={(formData: any) => { setToggleFormQuiz({ type: 'form' }) }} />
                </div>
            </div>
        </div>
    )
    return layout;
}