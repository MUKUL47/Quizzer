import React, { useState } from 'react';
import './quiz.scss'
import Header from './header/header';
export default function Quiz() {
    return (
        <div className="quiz-layout">
            <div className="quiz-l-d">
                <div className="header-quiz">
                    <Header />
                </div>
                <div className="quiz_ques-quesTab">
                    <div className="quiz-ques">questions</div>
                    <div className="quiz-quesTab">questions-tab</div>
                </div>
            </div>
        </div>
    )
}