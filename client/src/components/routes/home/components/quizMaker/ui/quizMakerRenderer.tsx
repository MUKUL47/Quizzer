import React from 'react';
import './quizMakerRenderer.scss'
import QuizForm from './quizForm/quizForm';
export default function QuizMakerLayout() {
    const layout = (
        <div>
            <div className="quizMakerBg"></div>
            <div className="quiz-maker">
                <div className="layout"><QuizForm /></div>
            </div>
        </div>
    )
    return layout;
}