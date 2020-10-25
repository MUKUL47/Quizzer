import React , { useState, useContext } from 'react';
import { Button } from '../../../../../../../../shared/material-ui-modules'
import './header.scss'
import { QuizContext } from '../quizContextService';
export default function Header(props: any) {
    const quizContext: any = useContext(QuizContext);
    return (
        <div className="quiz-header">
            <div className="quiz-remaining-time">
                {
                    quizContext.quizStatus.get ?
                    <>
                        <span id='rem-time' style={{fontSize : '20px'}}>Quiz Over</span>
                    </>:
                    <>
                        <span id='rem-time'>Remaining Time : </span>
                        <span id='rem-min'>{props.remainingTime}</span>
                    </>
                }
                
            </div>
            <div className="quiz-submit-abandon">
                <span className="quiz-submit quiz-btn">
                    <Button 
                        onClick={e => props.submitQuiz()} 
                        disabled ={quizContext.quizStatus.get}
                    >Submit</Button>
                </span>
            </div>
        </div>
    )
}