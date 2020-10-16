import React, { useState } from 'react';
import './quiz.scss'
import Header from './header/header';
import Question from './question/question';
import QuestionsTab from './questionsTab/questionsTab';
export default function Quiz() {
    return (
        <div className="quiz-layout">
            <div className="quiz-l-d">
                <div className="header-quiz">
                    <Header />
                </div>
                <div className="quiz_ques-quesTab">
                    <div className="quiz-ques"><Question /></div>
                    <div className="quiz-quesTab"><QuestionsTab /></div>
                </div>
            </div>
        </div>
    )
}