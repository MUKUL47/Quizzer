import React from 'react';
import './quizMakerRenderer.scss'
import QuizForm from './quizForm/quizForm';
import QuestionLayout from './questionLayout/questionlayout';
import { HomeIcon } from '../../../../../../shared/material-ui-modules';
export default function QuizMakerLayout() {
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
                {/* <div className="layout"><QuizForm /></div> */}
                <div className="layout"><QuestionLayout /></div>
            </div>
        </div>
    )
    return layout;
}